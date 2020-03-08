export default class Valid {
  static ytUrl (url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let patt = new RegExp(p, 'g');

    return patt.test(url);
  }
}