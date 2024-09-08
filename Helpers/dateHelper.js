export default class DateHelper {
  /**
   * 
   * @param {string} dateString data no formato yyyy-MM-dd
   * @returns {string} dd/MM/yyyy
   */
  static date(dateString) {
    const parts = dateString.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return new Intl.DateTimeFormat('pt-BR').format(date)
  }
}