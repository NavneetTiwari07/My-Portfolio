// Icons
window.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
  });
  
  // Year
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  navToggle?.addEventListener("click", () => navMenu.classList.toggle("open"));
  navMenu?.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });
  
  // Smooth active link highlight using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { root: null, threshold: 0.6 });
  
  sections.forEach(s => obs.observe(s));
  
  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.25 });
  revealEls.forEach(el => revealObs.observe(el));
  
  // Animate skill bars on visibility
  const progressBars = document.querySelectorAll(".progress span");
  const progressObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = el.getAttribute("data-progress");
        requestAnimationFrame(() => { el.style.width = `${val}%`; });
        progressObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  progressBars.forEach(el => progressObs.observe(el));
  
  // Charts
  function initCharts() {
    // Project 1: Chart.js Line - Retail Sales Trends
    const ctxSales = document.getElementById("chartSales");
    if (ctxSales) {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const dataCurrent = [120,135,128,160,180,210,240,250,230,220,260,300];
      const dataLast =    [100,112,118,130,150,170,190,205,195,200,210,230];
      new Chart(ctxSales, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Current Year",
              data: dataCurrent,
              borderColor: "#00ffe0",
              backgroundColor: "rgba(0,255,224,0.15)",
              tension: 0.35,
              fill: true,
              pointRadius: 3,
            },
            {
              label: "Last Year",
              data: dataLast,
              borderColor: "#00b3ff",
              backgroundColor: "rgba(0,179,255,0.12)",
              tension: 0.35,
              fill: true,
              pointRadius: 3,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#e8e8e8" } },
            tooltip: { mode: "index", intersect: false }
          },
          scales: {
            x: { ticks: { color: "#a9a9a9" }, grid: { color: "rgba(255,255,255,0.05)" } },
            y: { ticks: { color: "#a9a9a9" }, grid: { color: "rgba(255,255,255,0.05)" } }
          },
          animation: { duration: 900, easing: "easeOutQuart" }
        }
      });
    }
  
    // Project 2: Plotly 3D scatter - Customer Segmentation
    const clusterDiv = document.getElementById("plotClusters");
    if (clusterDiv) {
      const r = [10,22,15,28,12,25,35,40,18,22,30,38];
      const f = [5,3,8,2,10,4,1,1,7,6,2,1];
      const m = [200,420,260,550,180,460,780,900,300,440,650,820];
      const labels = ["A","B","A","B","A","B","C","C","A","B","C","C"];
  
      const colors = labels.map(l => l==="A" ? "#00ffe0" : l==="B" ? "#00b3ff" : "#a15cff");
      Plotly.newPlot(clusterDiv, [{
        x: r, y: f, z: m,
        mode: "markers",
        type: "scatter3d",
        marker: { size: 5, color: colors, opacity: 0.9 },
        text: labels
      }], {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        margin: { l: 0, r: 0, t: 0, b: 0 },
        scene: {
          xaxis: { title: "Recency", color: "#a9a9a9", gridcolor: "rgba(255,255,255,0.08)" },
          yaxis: { title: "Frequency", color: "#a9a9a9", gridcolor: "rgba(255,255,255,0.08)" },
          zaxis: { title: "Monetary", color: "#a9a9a9", gridcolor: "rgba(255,255,255,0.08)" },
          bgcolor: "rgba(0,0,0,0)"
        },
        showlegend: false
      }, { responsive: true });
    }
  
    // Project 3: Chart.js Bar - A/B Test Conversion
    const ctxAB = document.getElementById("chartAB");
    if (ctxAB) {
      const labels = ["Week 1","Week 2","Week 3","Week 4","Week 5"];
      const convA = [3.2, 3.5, 3.4, 3.7, 3.9];
      const convB = [3.0, 3.4, 3.8, 4.0, 4.2];
      new Chart(ctxAB, {
        type: "bar",
        data: {
          labels,
          datasets: [
            { label: "Variant A", data: convA, backgroundColor: "rgba(0,255,224,0.5)", borderColor: "#00ffe0", borderWidth: 1, borderRadius: 6 },
            { label: "Variant B", data: convB, backgroundColor: "rgba(0,179,255,0.5)", borderColor: "#00b3ff", borderWidth: 1, borderRadius: 6 }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#e8e8e8" } },
            tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%` } }
          },
          scales: {
            x: { ticks: { color: "#a9a9a9" }, grid: { display: false } },
            y: { ticks: { color: "#a9a9a9", callback: v => v + "%" }, grid: { color: "rgba(255,255,255,0.05)" } }
          },
          animation: { duration: 900, easing: "easeOutQuart" }
        }
      });
    }
  
    // Project 4: Plotly Forecast
    const forecastDiv = document.getElementById("plotForecast");
    if (forecastDiv) {
      const x = Array.from({ length: 24 }, (_, i) => i + 1);
      const actual = x.map(i => 50 + Math.sin(i/2)*10 + (i>18 ? (Math.random()*5) : 0));
      const forecast = x.map(i => 52 + Math.sin(i/2)*9);
      Plotly.newPlot(forecastDiv, [
        { x, y: actual, type: "scatter", mode: "lines", name: "Actual", line: { color: "#00ffe0" } },
        { x, y: forecast, type: "scatter", mode: "lines", name: "Forecast", line: { color: "#a15cff", dash: "dot" } }
      ], {
        paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
        margin: { l: 24, r: 8, t: 8, b: 24 },
        xaxis: { color: "#a9a9a9", gridcolor: "rgba(255,255,255,0.08)" },
        yaxis: { color: "#a9a9a9", gridcolor: "rgba(255,255,255,0.08)" }
      }, { responsive: true });
    }
  }
  
  window.addEventListener("load", initCharts);

  
  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".toggle-img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            let current = this.getAttribute("src");
            let alternate = this.getAttribute("data-alt");

            this.setAttribute("src", alternate);
            this.setAttribute("data-alt", current);
        });
    });
});
