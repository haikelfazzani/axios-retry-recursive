const configPath = window.dirName + '/config.json';

export default class StorageManager {

  static async getList () {
    let data = await window.fsPromises.readFile(configPath, { encoding: 'utf8' });
    return data ? JSON.parse(data) : [];
  }

  static async saveOne (vidInfos) {
    let listVids = await this.getList();
    if (!listVids.some(v => v.vidId === vidInfos.vidId)) {
      listVids.push(vidInfos);
      await window.fsPromises.writeFile(configPath, JSON.stringify(listVids), { encoding: 'utf8' });
    }
  }

  static async removeOne (vidId) {
    let listVids = await this.getList();    
    let newData = listVids.filter(d => d.vidId !== vidId);
    await window.fsPromises.writeFile(configPath, JSON.stringify(newData), { encoding: 'utf8' });
  }

}