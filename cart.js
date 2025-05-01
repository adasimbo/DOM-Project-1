// cart.js
document.addEventListener('DOMContentLoaded', () => {
    // Recalculate and render the grand total
    function updateGrandTotal() {
      const totals = Array.from(document.querySelectorAll('.item-total'))
        .map(el => parseFloat(el.textContent) || 0);
      const grand = totals.reduce((sum, n) => sum + n, 0);
      document.getElementById('cart-grand-total').textContent = grand.toFixed(2);
    }
  
    // Handle + and - clicks
    function onQtyChange(e) {
      const btn = e.currentTarget;
      const item = btn.closest('.cart-item');
      const qtyEl = item.querySelector('.item-qty');
      let qty = parseInt(qtyEl.textContent, 10);
  
      if (btn.classList.contains('plus')) {
        qty++;
      } else if (btn.classList.contains('minus')) {
        qty = Math.max(1, qty - 1);
      }
  
      qtyEl.textContent = qty;
      // Update this item’s total
      const price = parseFloat(item.querySelector('.item-price').textContent);
      item.querySelector('.item-total').textContent = (price * qty).toFixed(2);
  
      updateGrandTotal();
    }
  
    // Handle delete clicks
    function onDelete(e) {
      e.currentTarget.closest('.cart-item').remove();
      updateGrandTotal();
    }
  
    // Handle like (heart) clicks
    function onLike(e) {
      e.currentTarget.classList.toggle('liked');
      // CSS should define .liked to e.g. fill or color the heart
    }
  
    // Wire up each cart item
    document.querySelectorAll('.cart-item').forEach(item => {
      item.querySelector('.plus').addEventListener('click', onQtyChange);
      item.querySelector('.minus').addEventListener('click', onQtyChange);
      item.querySelector('.delete').addEventListener('click', onDelete);
      item.querySelector('.like').addEventListener('click', onLike);
    });
  
    // Initial total calculation
    updateGrandTotal();
  });
  