// تشغيل مكتبة أنيميشن التمرير (AOS)
// duration: مدة الأنيميشن بالمللي ثانية
// once: true يعني الأنيميشن يشتغل مرة واحدة بس لما العنصر يظهر
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// التحكم في القائمة الجانبية بأنيميشن
const openBtn = document.getElementById('openMenu');
const closeBtn = document.getElementById('closeMenu');
const overlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.side-menu a');

function openMenu() {
  overlay.style.display = 'flex';
  // تأخير بسيط عشان الـ CSS transition يشتغل
  setTimeout(() => {
    overlay.classList.add('active');
    // ظهور الروابط واحد تلو الآخر
    menuLinks.forEach((link, index) => {
      link.style.transitionDelay = `${index * 0.1 + 0.2}s`;
    });
  }, 10);
}

function closeMenuFunc() {
  overlay.classList.remove('active');
  menuLinks.forEach(link => link.style.transitionDelay = '0s');
  // انتظار انتهاء الأنيميشن قبل الإخفاء
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400);
}

openBtn.onclick = openMenu;
closeBtn.onclick = closeMenuFunc;

document.querySelectorAll('.side-menu a').forEach(link => {
  link.onclick = closeMenuFunc;
});

// (اختياري) تغيير لون الهيدر عند التمرير
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
  } else {
    header.style.background = 'rgba(255,255,255,0.8)';
    header.style.boxShadow = 'none';
  }
});