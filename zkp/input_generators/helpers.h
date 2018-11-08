#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <limits.h>
#include <unistd.h>

void hex_to_bytearray(std::string str, std::vector<int> &array)
{
	int length = str.length();
	// make sure the input string has an even digit numbers
	if(length%2 == 1)
	{
		str = "0" + str;
		length++;
	}

	// allocate memory for the output array
	array.reserve(length/2);

	std::stringstream sstr(str);
	for(int i=0; i < length/2; i++)
	{
		char ch1, ch2;
		sstr >> ch1 >> ch2;
		int dig1, dig2;
		if(isdigit(ch1)) dig1 = ch1 - '0';
		else if(ch1>='A' && ch1<='F') dig1 = ch1 - 'A' + 10;
		else if(ch1>='a' && ch1<='f') dig1 = ch1 - 'a' + 10;
		if(isdigit(ch2)) dig2 = ch2 - '0';
		else if(ch2>='A' && ch2<='F') dig2 = ch2 - 'A' + 10;
		else if(ch2>='a' && ch2<='f') dig2 = ch2 - 'a' + 10;
		array.push_back(dig1*16 + dig2);
	}
}
