/* global describe, artifacts, contract, it, assert, web3, beforeEach */
/* eslint-disable no-unused-expressions */

const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const DataSetManager = require('../DataSetManager.js')
const FileManager = require('../FileManager.js')
const { HTTPHandler } = require('../protocolHandlers')


const BASE_FOLDER = 'datasets'
const handler = new HTTPHandler(BASE_FOLDER)
const fm = new FileManager(BASE_FOLDER)

const dm = new DataSetManager(handler, fm)

chai.use(chaiAsPromised)
const should = chai.should()
const expect = chai.expect

const datasetID = '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
const symKey = 'b5866644dd272645a37c5df6b0fbd9dde5f1fcd7da882fe80a1fa4d1ba07ddce'

const datasetFolder = `${BASE_FOLDER}/${datasetID}`
const encFilePath = `${datasetFolder}/${datasetID}.enc`
const decFilePath = `${datasetFolder}/${datasetID}.dec`
const symKeyPath = `${datasetFolder}/${datasetID}.sym`
const algoPath = `${datasetFolder}/proofs`
const proofPath = `${algoPath}/sum.proof`

describe('Dataset Manager', function () {

  describe('dirs', function () {
    it('should init structure', async () => {
      await dm.initStructure()
      expect(await dm.fm.exists(BASE_FOLDER)).to.be.true
    })

    it('should have proper paths', async () => {
      dm.getDatasetFolder(datasetID).should.be.equal(datasetFolder)
      dm.getEncPath(datasetID).should.be.equal(encFilePath)
      dm.getDecPath(datasetID).should.be.equal(decFilePath)
      dm.getSymKeyPath(datasetID).should.be.equal(symKeyPath)
      dm.getAlgorithmFolder(datasetID).should.be.equal(algoPath)
      dm.getProofPath(datasetID, 'sum').should.be.equal(proofPath)
    })
  })

  describe('Keys', function () {
    it('should save a symmetric key', async () => {
      await dm.writeKey(datasetID, symKey)
      expect(await dm.fm.exists(dm.getSymKeyPath(datasetID))).to.be.true
    })
  })

  describe('Proofs', function () {
    it('should copy a proof to proof folder', async () => {
      await dm.moveProof(path.join(__dirname, `${datasetID}.proof`), datasetID, 'sum')
      expect(await dm.fm.exists(dm.getProofPath(datasetID, 'sum'))).to.be.true
    })

    it('proof should exist', async () => {
      await dm.moveProof(path.join(__dirname, `${datasetID}.proof`), datasetID, 'sum')
      expect(await dm.proofExists(datasetID, 'sum')).to.be.true
    })
  })
})
