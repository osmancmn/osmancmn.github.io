"use strict";

const projeListesi = [
  {
    id: 1,
    ad: "NexaTask Dashboard",
    kategori: "web",
    tip: "WEB PLATFORM",
    aciklama:
      "Görev yönetimi, ekip takibi ve üretkenlik analizi sunan modern bir proje paneli. Yönetim ekranları, kart yapısı ve responsive arayüz yaklaşımıyla tasarlandı.",
    teknolojiler: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
  {
    id: 2,
    ad: "Shadow Arena: Last Pulse",
    kategori: "game",
    tip: "2D SURVIVAL GAME",
    aciklama:
      "Dalga tabanlı düşman sistemi, otomatik saldırı mantığı ve seviye atlama akışı bulunan hızlı tempolu bir hayatta kalma oyunu. Oyuncu gelişimini hissettiren sade ama etkili bir yapı sunar.",
    teknolojiler: ["Unity", "C#", "2D Game Design", "Combat Logic"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
  {
    id: 3,
    ad: "CodeSnap Builder",
    kategori: "tool",
    tip: "DEVELOPER TOOL",
    aciklama:
      "Kod parçalarını daha okunabilir ve paylaşılabilir kartlara dönüştüren bir geliştirici aracı. Eğitim içerikleri ve teknik sunumlar için pratik kullanım sağlar.",
    teknolojiler: ["JavaScript", "UI Tool", "Code Preview", "Export Logic"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
  {
    id: 4,
    ad: "CampusFlow Student Portal",
    kategori: "web",
    tip: "PORTAL SYSTEM",
    aciklama:
      "Ders, duyuru, etkinlik ve akademik takvim bilgilerini tek panelde toplayan öğrenci odaklı portal sistemi. Hızlı erişim ve sade bilgi mimarisi ile geliştirildi.",
    teknolojiler: ["HTML", "CSS", "JavaScript", "Dashboard"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
  {
    id: 5,
    ad: "Pixel Drift Racers",
    kategori: "game",
    tip: "BROWSER GAME",
    aciklama:
      "Tarayıcı üzerinden oynanabilen refleks odaklı arcade yarış oyunu. Basit kontroller, skor sistemi ve hız hissini güçlendiren akıcı oyun yapısına sahiptir.",
    teknolojiler: ["Canvas", "JavaScript", "Arcade Logic", "Score System"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
  {
    id: 6,
    ad: "PlayTest Insight Panel",
    kategori: "tool",
    tip: "ANALYSIS TOOL",
    aciklama:
      "Oyun testlerinden gelen geri bildirimleri kategorilere ayıran ve geliştirme önceliklerini gösteren analiz paneli. Tasarım ve geliştirme ekiplerine karar desteği sunar.",
    teknolojiler: ["Analytics", "Feedback System", "Data Grouping", "Game UX"],
    github: "https://github.com/osmancmn",
    canli: "#",
  },
];

const yaziciMetinleri = [
  "Yazılım geliştiriyorum, oyun sistemleri kurguluyorum ve modern arayüzler tasarlıyorum.",
  "Projelerimde düzenli yapı, estetik görünüm ve kullanıcı deneyimini birlikte düşünüyorum.",
  "Amacım sadece çalışan işler çıkarmak değil, gerçek ürün hissi veren sistemler üretmek.",
];

const htmlElemani = document.documentElement;
const temaButonu = document.getElementById("themeToggle");
const menuButonu = document.getElementById("menuToggle");
const navLinkListesi = document.getElementById("navLinks");
const filtreAlani = document.getElementById("projectFilters");
const projelerGridi = document.getElementById("projectsGrid");
const menuLinkleri = document.querySelectorAll(".nav-links a");
const bolumler = document.querySelectorAll("main section[id]");
const header = document.querySelector(".site-header");
const heroTypewriter = document.getElementById("heroTypewriter");

const TEMA_ANAHTARI = "osman-portfolyo-tema";
let yaziciMetinIndex = 0;
let yaziciKarakterIndex = 0;
let silmeModu = false;

function kayitliTemayiGetir() {
  return localStorage.getItem(TEMA_ANAHTARI) || "dark";
}

function temaUygula(tema) {
  htmlElemani.setAttribute("data-theme", tema);
  localStorage.setItem(TEMA_ANAHTARI, tema);
  temaButonu.textContent = tema === "dark" ? "🌙" : "☀️";
  temaButonu.setAttribute("aria-label", tema === "dark" ? "Açık temaya geç" : "Koyu temaya geç");
}

function temaDegistir() {
  const aktifTema = htmlElemani.getAttribute("data-theme");
  temaUygula(aktifTema === "dark" ? "light" : "dark");
}

function kategoriEtiketiGetir(kategori) {
  if (kategori === "web") return "Web";
  if (kategori === "game") return "Oyun";
  if (kategori === "tool") return "Araç";
  return "Proje";
}

function projeKartiOlustur(proje) {
  const teknolojiEtiketleri = proje.teknolojiler
    .map((teknoloji) => `<li>${teknoloji}</li>`)
    .join("");

  return `
    <article class="project-card reveal visible" data-category="${proje.kategori}">
      <div class="project-card-top">
        <span class="project-type">${proje.tip}</span>
        <span class="project-mini-category">${kategoriEtiketiGetir(proje.kategori)}</span>
      </div>
      <h3>${proje.ad}</h3>
      <p>${proje.aciklama}</p>
      <ul class="project-tags">${teknolojiEtiketleri}</ul>
      <div class="project-links">
        <a href="${proje.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${proje.canli}" target="_blank" rel="noopener">Canlı Önizleme</a>
      </div>
    </article>
  `;
}

function projeleriRenderEt(filtre = "all") {
  const filtrelenmisProjeler =
    filtre === "all" ? projeListesi : projeListesi.filter((proje) => proje.kategori === filtre);

  if (!filtrelenmisProjeler.length) {
    projelerGridi.innerHTML = `<div class="projects-empty">Bu kategoride proje bulunamadı.</div>`;
    return;
  }

  projelerGridi.innerHTML = filtrelenmisProjeler.map(projeKartiOlustur).join("");
}

function aktifFiltreButonunuGuncelle(secilenFiltre) {
  document.querySelectorAll(".filter-btn").forEach((buton) => {
    buton.classList.toggle("active", buton.dataset.filter === secilenFiltre);
  });
}

function menuAcKapat() {
  menuButonu.classList.toggle("active");
  navLinkListesi.classList.toggle("open");
  menuButonu.setAttribute("aria-expanded", String(navLinkListesi.classList.contains("open")));
}

function menuyuKapat() {
  menuButonu.classList.remove("active");
  navLinkListesi.classList.remove("open");
  menuButonu.setAttribute("aria-expanded", "false");
}

const revealGozlemcisi = new IntersectionObserver(
  (girisler) => {
    girisler.forEach((giris) => {
      if (giris.isIntersecting) {
        giris.target.classList.add("visible");
        revealGozlemcisi.unobserve(giris.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

function revealElemanlariniHazirla() {
  document.querySelectorAll(".reveal").forEach((eleman) => {
    if (!eleman.classList.contains("visible")) {
      revealGozlemcisi.observe(eleman);
    }
  });
}

function aktifMenyuLinkiniGuncelle() {
  let aktifBolumId = "";

  bolumler.forEach((bolum) => {
    const bolumUst = bolum.offsetTop - 140;
    const bolumAlt = bolumUst + bolum.offsetHeight;
    if (window.scrollY >= bolumUst && window.scrollY < bolumAlt) {
      aktifBolumId = bolum.id;
    }
  });

  menuLinkleri.forEach((link) => {
    const hedef = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", hedef === aktifBolumId);
  });
}

function headerEfektiGuncelle() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function smoothScrollBagla() {
  document.querySelectorAll('a[href^="#"]').forEach((baglanti) => {
    baglanti.addEventListener("click", (olay) => {
      const hedefId = baglanti.getAttribute("href");
      if (!hedefId || hedefId === "#") return;
      const hedefEleman = document.querySelector(hedefId);
      if (!hedefEleman) return;
      olay.preventDefault();
      const ustBosluk = 90;
      const hedefKonum = hedefEleman.getBoundingClientRect().top + window.scrollY - ustBosluk;
      window.scrollTo({ top: hedefKonum, behavior: "smooth" });
      menuyuKapat();
    });
  });
}

function yaziciEfektiCalistir() {
  const aktifMetin = yaziciMetinleri[yaziciMetinIndex];

  if (!silmeModu) {
    heroTypewriter.textContent = aktifMetin.slice(0, yaziciKarakterIndex + 1);
    yaziciKarakterIndex += 1;

    if (yaziciKarakterIndex === aktifMetin.length) {
      silmeModu = true;
      setTimeout(yaziciEfektiCalistir, 1600);
      return;
    }

    setTimeout(yaziciEfektiCalistir, 40);
  } else {
    heroTypewriter.textContent = aktifMetin.slice(0, yaziciKarakterIndex - 1);
    yaziciKarakterIndex -= 1;

    if (yaziciKarakterIndex === 0) {
      silmeModu = false;
      yaziciMetinIndex = (yaziciMetinIndex + 1) % yaziciMetinleri.length;
      setTimeout(yaziciEfektiCalistir, 400);
      return;
    }

    setTimeout(yaziciEfektiCalistir, 22);
  }
}

function olaylariBagla() {
  temaButonu.addEventListener("click", temaDegistir);
  menuButonu.addEventListener("click", menuAcKapat);

  menuLinkleri.forEach((link) => {
    link.addEventListener("click", menuyuKapat);
  });

  filtreAlani.addEventListener("click", (olay) => {
    const buton = olay.target.closest(".filter-btn");
    if (!buton) return;
    const secilenFiltre = buton.dataset.filter;
    aktifFiltreButonunuGuncelle(secilenFiltre);
    projeleriRenderEt(secilenFiltre);
  });

  window.addEventListener("scroll", () => {
    aktifMenyuLinkiniGuncelle();
    headerEfektiGuncelle();
  });

  smoothScrollBagla();
}

function uygulamayiBaslat() {
  temaUygula(kayitliTemayiGetir());
  projeleriRenderEt("all");
  revealElemanlariniHazirla();
  olaylariBagla();
  aktifMenyuLinkiniGuncelle();
  headerEfektiGuncelle();
  yaziciEfektiCalistir();
}

document.addEventListener("DOMContentLoaded", uygulamayiBaslat);
