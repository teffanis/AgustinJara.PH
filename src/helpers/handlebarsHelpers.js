// Helpers personalizados para Handlebars
module.exports = {
  /**
   * Multiply - multiplica dos números
   * Uso: {{multiply a b}}
   */
  multiply: function (a, b) {
    return (a * b).toFixed(2);
  },

  /**
   * Eq - compara igualdad
   * Uso: {{#eq a b}}...{{/eq}}
   */
  eq: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  },

  /**
   * Gt - compara mayor que
   * Uso: {{#if (gt a b)}}...{{/if}}
   */
  gt: function (a, b) {
    return a > b;
  },

  /**
   * Lt - compara menor que
   * Uso: {{#if (lt a b)}}...{{/if}}
   */
  lt: function (a, b) {
    return a < b;
  },

  /**
   * Gte - compara mayor o igual que
   */
  gte: function (a, b) {
    return a >= b;
  },

  /**
   * Lte - compara menor o igual que
   */
  lte: function (a, b) {
    return a <= b;
  },

  /**
   * CartSubtotal - calcula el subtotal del carrito
   * Uso: {{cartSubtotal products}}
   */
  cartSubtotal: function (products) {
    if (!products || !Array.isArray(products)) return '0.00';
    
    const total = products.reduce((sum, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return sum + (price * quantity);
    }, 0);

    return total.toFixed(2);
  },

  /**
   * Format currency
   * Uso: {{currency amount}}
   */
  currency: function (amount) {
    if (amount === null || amount === undefined) return '$0.00';
    return '$' + parseFloat(amount).toFixed(2);
  },

  /**
   * Format date
   * Uso: {{formatDate date}}
   */
  formatDate: function (date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Truncate - trunca texto
   * Uso: {{truncate text 50}}
   */
  truncate: function (text, length) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  /**
   * IsEmpty - verifica si está vacío
   * Uso: {{#isEmpty array}}...{{/isEmpty}}
   */
  isEmpty: function (value, options) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return options.fn(this);
    }
    return options.inverse(this);
  }
};
