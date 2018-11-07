class DataSetManager {
  constructor (handler, fm) {
    this.handler = handler
    this.fm = fm
    this.baseFolder = this.fm.baseFolder
  }

  async initStructure () {
    if (!(await this.fm.exists(this.baseFolder))) {
      await this.fm.mkdir(this.baseFolder)
    }
  }

  getFileManager () {
    return this.fm
  }

  getProtocolHandler () {
    return this.handler
  }

  download (datasetID, location) {
    return this.handler.download(location, this.getEncPath(datasetID))
  }

  upload (location) {
    return this.handler.upload(location)
  }

  getDatasetFolder (hash) {
    return this.fm.getPath(hash)
  }

  getAlgorithmFolder (hash) {
    return this.fm.getPath(hash, 'proofs')
  }

  getEncPath (hash) {
    return this.fm.getPath(hash, `${hash}.${this.fm.getExtension('enc')}`)
  }

  getDecPath (hash) {
    return this.fm.getPath(hash, `${hash}.${this.fm.getExtension('dec')}`)
  }

  getSymKeyPath (hash) {
    return this.fm.getPath(hash, `${hash}.${this.fm.getExtension('sym')}`)
  }

  getProofPath (hash, algorithm) {
    return this.fm.getPath(hash, 'proofs', `${algorithm}.${this.fm.getExtension('proof')}`)
  }

  getInputPath (hash, algorithm) {
    return this.fm.getPath(hash, 'proofs', `${algorithm}.inputs`)
  }

  getOutputPath (hash, algorithm) {
    return this.fm.getPath(hash, 'proofs', `${algorithm}.outputs`)
  }

  proofExists (datasetID, algorithmID) {
    return this.fm.exists(this.getProofPath(datasetID, algorithmID))
  }

  datasetExists (datasetID) {
    return this.fm.exists(this.getEncPath(datasetID))
  }

  async createFolderIfNotExist (path) {
    if (!(await this.fm.exists(path))) {
      await this.fm.mkdir(path)
    }
  }

  async writeKey (datasetID, key) {
    await this.createFolderIfNotExist(this.getDatasetFolder(datasetID))

    const keyPath = this.getSymKeyPath(datasetID)
    await this.fm.writeFile(keyPath, key)
  }

  async writeFileMeta (datasetID, metadata) {
    await this.createFolderIfNotExist(this.getDatasetFolder(datasetID))

    const metaPath = this.fm.getPath(datasetID, `${datasetID}.json`)

    await this.fm.writeFile(metaPath, metadata)
  }

  async readProof (datasetID, algorithmID) {
    const proof = await this.fm.readFile(this.getProofPath(datasetID, algorithmID))
    return proof
  }

  _clean (data) {
    return data
      .toString()
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '') // trim and removes empty elements
  }

  async readInput (datasetID, algorithmID) {
    /* File is small so is ok to read it at once. If the future consider using readline nodejs core module */
    let inputs = await this.fm.readFile(this.getInputPath(datasetID, algorithmID))
    return this._clean(inputs)
  }

  async readOutput (datasetID, algorithmID) {
    /* File is small so is ok to read it at once. If the future consider using readline nodejs core module */
    let out = await this.fm.readFile(this.getOutputPath(datasetID, algorithmID))
    return this._clean(out)
  }

  async moveProof (src, datasetID, algorithmID) {
    await this.createFolderIfNotExist(this.getAlgorithmFolder(datasetID))
    await this.fm.copyFile(src, this.getProofPath(datasetID, algorithmID))
  }

  async moveZKPFiles (src, datasetID, algorithmID) {
    await this.createFolderIfNotExist(this.getAlgorithmFolder(datasetID))
    const proofPath = this.getProofPath(datasetID, algorithmID)
    const proofFolder = this.getAlgorithmFolder(datasetID)

    await this.fm.copyFile(`${src}/${algorithmID}.json`, proofPath)
    await this.fm.copyFile(`${src}/${algorithmID}.inputs`, `${proofFolder}/${algorithmID}.inputs`)
    await this.fm.copyFile(`${src}/${algorithmID}.outputs`, `${proofFolder}/${algorithmID}.outputs`)
  }
}

module.exports = DataSetManager
