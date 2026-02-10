document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  // Observer buat detect kalau elemen masuk/keluar viewport
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const bar = entry.target;
      const target = parseInt(bar.getAttribute("aria-valuenow"), 10);
      const valueSpan = bar.querySelector(".progress-value");

      if (entry.isIntersecting) {
        // Ketika masuk viewport → jalankan animasi
        bar.style.transition = "width 2s ease-in-out";
        bar.style.width = target + "%";

        let current = 0;
        const duration = 2000; // 2 detik
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const counter = setInterval(() => {
          current++;
          valueSpan.textContent = current + "%";
          if (current >= target) clearInterval(counter);
        }, stepTime);
      } else {
        // Ketika keluar viewport → reset ke 0%
        bar.style.transition = "none"; // supaya langsung reset
        bar.style.width = "0%";
        valueSpan.textContent = "0%";
      }
    });
  }, { threshold: 0.3 }); // 30% kelihatan baru animasi jalan

  // Apply observer ke semua progress bar
  progressBars.forEach(bar => observer.observe(bar));
});
