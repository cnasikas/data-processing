/* Code by: https://github.com/fleupold/pepper_solidity_export/blob/master/export.cpp */

#include <iostream>
#include <iomanip>
#include <fstream>

#include <libsnark/common/default_types/r1cs_ppzksnark_pp.hpp>
#include <libsnark/zk_proof_systems/ppzksnark/r1cs_ppzksnark/r1cs_ppzksnark.hpp>

void replaceAll(std::string& haystack, const std::string needle, const std::string target) {
	std::string::size_type n = 0;
	while ( ( n = haystack.find( needle, n ) ) != std::string::npos ) {
		haystack.replace( n, needle.size(), target);
		n += target.size();
	}
}

std::string HexStringFromLibsnarkBigint(libff::bigint<libsnark::default_r1cs_ppzksnark_pp::Fp_type::num_limbs> _x){
	uint8_t x[32];
	for (unsigned i = 0; i < 4; i++) {
		for (unsigned j = 0; j < 8; j++) {
			x[i * 8 + j] = uint8_t(uint64_t(_x.data[3 - i]) >> (8 * (7 - j)));
		}
	}

	std::stringstream ss;
	ss << std::setfill('0');
	for (unsigned i = 0; i<32; i++) {
		ss << std::hex << std::setw(2) << (int)x[i];
	}

	std::string str = ss.str();
	return str.erase(0, std::min(str.find_first_not_of('0'), str.size()-1));
}

std::string outputPointG1AffineAsHex(libff::G1<libsnark::default_r1cs_ppzksnark_pp> _p, bool escape)
{
	libff::G1<libsnark::default_r1cs_ppzksnark_pp> aff = _p;
	aff.to_affine_coordinates();
	return
		(escape ? "[\"0x" : "0x") +
		HexStringFromLibsnarkBigint(aff.X.as_bigint()) +
		(escape ? "\", \"0x" : ", 0x") +
		HexStringFromLibsnarkBigint(aff.Y.as_bigint()) +
		(escape ? "\"]" : "");
}

std::string outputPointG2AffineAsHex(libff::G2<libsnark::default_r1cs_ppzksnark_pp> _p, bool escape)
{
	libff::G2<libsnark::default_r1cs_ppzksnark_pp> aff = _p;
	aff.to_affine_coordinates();
	return
		(escape ? "[[\"0x" : "[0x") +
		HexStringFromLibsnarkBigint(aff.X.c1.as_bigint()) +
		(escape ? "\", \"0x" : ", 0x") +
		HexStringFromLibsnarkBigint(aff.X.c0.as_bigint()) +
		(escape ? "\"], [\"0x" : "], [0x") +
		HexStringFromLibsnarkBigint(aff.Y.c1.as_bigint()) +
		(escape ? "\", \"0x" : ", 0x") +
		HexStringFromLibsnarkBigint(aff.Y.c0.as_bigint()) +
		(escape ? "\"]]" : "]");
}

void export_verificationKey(char *verification_key_fn) {
	std::cout << "loading vk from file: " << verification_key_fn << std::endl;
  std::ifstream vkey_stream(verification_key_fn);
  std::ofstream vkey_json("vkey.json");

	if (!vkey_stream.good()) {
                std::cerr << "ERROR: " << verification_key_fn << " not found. " << std::endl;
                exit(1);
        }
	libsnark::r1cs_ppzksnark_verification_key<libsnark::default_r1cs_ppzksnark_pp> vk;
	vkey_stream >> vk;
	vkey_stream.close();

	unsigned icLength = vk.encoded_IC_query.rest.indices.size() + 1;

  vkey_json << "{" << std::endl;

	vkey_json << "    " << "\"A\": " << outputPointG2AffineAsHex(vk.alphaA_g2, true) << ", " << std::endl;
	vkey_json << "    " << "\"B\": " << outputPointG1AffineAsHex(vk.alphaB_g1, true) << ", " << std::endl;
	vkey_json << "    " << "\"C\": " << outputPointG2AffineAsHex(vk.alphaC_g2, true) << ", " << std::endl;
	vkey_json << "    " << "\"gamma\": " << outputPointG2AffineAsHex(vk.gamma_g2, true) << ", " << std::endl;
	vkey_json << "    " << "\"gammaBeta1\": " << outputPointG1AffineAsHex(vk.gamma_beta_g1, true) << ", " << std::endl;
	vkey_json << "    " << "\"gammaBeta2\": " << outputPointG2AffineAsHex(vk.gamma_beta_g2, true) << ", " << std::endl;
	vkey_json << "    " << "\"Z\": " << outputPointG2AffineAsHex(vk.rC_Z_g2, true) << ", " << std::endl;

  vkey_json << "    " << "\"IC\": [" << std::endl;

  vkey_json << "        " << outputPointG1AffineAsHex(vk.encoded_IC_query.first, true) << ", " << std::endl;

	std::stringstream ss;
	for (size_t i = 1; i < icLength; ++i) {
		auto vkICi = outputPointG1AffineAsHex(vk.encoded_IC_query.rest.values[i - 1], true);
		ss << "        " << vkICi;

    if (i != icLength - 1 ) {
      ss << ", " << std::endl;
    } else {
      ss << std::endl;
    }
	}

  vkey_json << ss.str();
  vkey_json << "    " << "]" << ", " << std::endl;

  vkey_json << "    " << "\"IC_length\": " << std::to_string(icLength) << ", " << std::endl;
  vkey_json << "    " << "\"input_length\": " << std::to_string(icLength - 1) << std::endl;

  vkey_json << "}" << std::endl;
  vkey_json.close();
}

void export_proof(char *proof_fn) {
	libsnark::r1cs_ppzksnark_proof<libsnark::default_r1cs_ppzksnark_pp> proof;

	std::cout << "loading proof from file: " << proof_fn << std::endl;
	std::ifstream proof_file(proof_fn);
  std::ofstream proof_json("proof.json");

	if (!proof_file.good()) {
		std::cerr << "ERROR: " << proof_fn << " not found. " << std::endl;
		exit(1);
	}
	proof_file >> proof;
	proof_file.close();

  proof_json << "{" << std::endl;

	proof_json << "    " << "\"AG\": " << outputPointG1AffineAsHex(proof.g_A.g, true) << ", " << std::endl;
	proof_json << "    " << "\"AH\": " << outputPointG1AffineAsHex(proof.g_A.h, true) << ", " << std::endl;
	proof_json << "    " << "\"BG\": " << outputPointG2AffineAsHex(proof.g_B.g, true) << ", " << std::endl;
	proof_json << "    " << "\"BH\": " << outputPointG1AffineAsHex(proof.g_B.h, true) << ", " << std::endl;
	proof_json << "    " << "\"CG\": " << outputPointG1AffineAsHex(proof.g_C.g, true) << ", " << std::endl;
	proof_json << "    " << "\"CH\": " << outputPointG1AffineAsHex(proof.g_C.h, true) << ", " << std::endl;
	proof_json << "    " << "\"H\": " << outputPointG1AffineAsHex(proof.g_H, true) << ", " << std::endl;
	proof_json << "    " << "\"K\": " << outputPointG1AffineAsHex(proof.g_K, true) << std::endl;

  proof_json << "}" << std::endl;

  proof_json.close();
}

void print_usage(char* argv[]) {
	std::cout << "usage: " << std::endl <<
		"(1) " << argv[0] << " vk <verification key file>" << std::endl <<
		"(2) " << argv[0] << " proof <proof file>" << std::endl;
}

int main (int argc, char* argv[]) {
	if (argc != 3) {
		print_usage(argv);
		exit(1);
	}
	libsnark::default_r1cs_ppzksnark_pp::init_public_params();
	if (!strcmp(argv[1], "vk")) {
		export_verificationKey(argv[2]);
	} else if (!strcmp(argv[1], "proof")) {
		export_proof(argv[2]);
	} else {
		print_usage(argv);
		exit(1);
	}
}
