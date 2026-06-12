const STORAGE_KEY = "flypay-digital-card-config-v1";
const STATS_KEY = "flypay-digital-card-stats-v1";
const SESSION_VISIT_KEY = "flypay-digital-card-visited-session";

const fallbackCardUrl = "https://contatocomercial.andrerubim.com.br";

const defaultConfig = {
  company: "Flypay",
  name: "ANDRÉ RUBIM",
  role: "Consultor Comercial Flypay",
  slogan: "Soluções de pagamento para fazer seu negócio crescer.",
  phone: "+5521994864419",
  whatsapp: "5521994864419",
  email: "rubim.work@yahoo.com.br",
  site: "https://flypay.com.br",
  instagram: "https://www.instagram.com/flypayoficial/",
  facebook: "https://www.facebook.com/flypayoficial/",
  linkedin: "https://www.linkedin.com/company/flypayoficial/",
  youtube: "https://www.youtube.com/@VideosFlybank/videos",
  mapUrl: "https://www.google.com/maps?q=Avenida%20Ator%20Jos%C3%A9%20Wilker%2C%20600%20Rio%20de%20Janeiro%20RJ&output=embed",
  photo: "assets/andre-rubim-foto.jpeg",
  logo: "assets/flypay-logo.svg",
  cardUrl: "https://contatocomercial.andrerubim.com.br",
  nfcLink: "https://contatocomercial.andrerubim.com.br",
  catalogUrl: "assets/catalogo-flypay.pdf",
  metaTitle: "André Rubim | Consultor Comercial Flypay",
  metaDescription: "Cartão digital interativo de André Rubim, Consultor Comercial Flypay. Fale no WhatsApp, salve o contato, conheça os serviços e compartilhe com 1 clique.",
  ogImage: "assets/andre-rubim-foto.jpeg",
  gaId: "",
  metaPixelId: "",
  colors: {
    primary: "#9D7DF7",
    dark: "#121212",
    light: "#FFFFFF"
  },
  services: [
    {
      title: "Maquininhas",
      text: "Fly Basic e Fly Premium: maquininhas com taxas competitivas, Pix por QR e suporte humanizado."
    },
    {
      title: "Pix",
      text: "Receba via Pix com agilidade e segurança, inclusive direto na maquininha por QR Code."
    },
    {
      title: "Link de Pagamento",
      text: "Venda online sem precisar de site: envie o link por WhatsApp, e-mail e redes sociais."
    },
    {
      title: "Gestão Financeira",
      text: "Conta digital e acompanhamento de recebíveis para manter controle do seu negócio."
    },
    {
      title: "Antecipação de Recebíveis",
      text: "Antecipe recebíveis com praticidade para ganhar fôlego de caixa e crescer."
    }
  ],
  testimonials: [
    {
      quote: "A Flypay melhorou totalmente a minha rotina de trabalho! Atendimento incrível e muito transparente.",
      author: "Renata Branco • Nutricionista"
    },
    {
      quote: "As maquininhas são excelentes. A entrega foi ágil e agora também recebo via Pix, o que agradou os clientes.",
      author: "João Carlos • Dono de restaurante"
    },
    {
      quote: "Eu precisava de uma solução rápida e eficiente e a Flypay atendeu todas as minhas expectativas.",
      author: "Fernanda Pereira • Loja online"
    }
  ]
};

const state = {
  config: loadConfig(),
  stats: loadStats(),
  qr: null
};

const elements = {
  html: document.documentElement,
  logoImage: document.getElementById("logoImage"),
  profileImage: document.getElementById("profileImage"),
  displayName: document.getElementById("displayName"),
  displayRole: document.getElementById("displayRole"),
  displaySlogan: document.getElementById("displaySlogan"),
  primaryWhatsapp: document.getElementById("primaryWhatsapp"),
  floatingWhatsapp: document.getElementById("floatingWhatsapp"),
  callButton: document.getElementById("callButton"),
  emailButton: document.getElementById("emailButton"),
  siteButton: document.getElementById("siteButton"),
  socialLinks: document.getElementById("socialLinks"),
  servicesGrid: document.getElementById("servicesGrid"),
  testimonialsGrid: document.getElementById("testimonialsGrid"),
  platformShareLinks: document.getElementById("platformShareLinks"),
  mapFrame: document.getElementById("mapFrame"),
  catalogButton: document.getElementById("catalogButton"),
  nfcLinkOutput: document.getElementById("nfcLinkOutput"),
  visitCount: document.getElementById("visitCount"),
  whatsappCount: document.getElementById("whatsappCount"),
  shareCount: document.getElementById("shareCount"),
  vcfCount: document.getElementById("vcfCount"),
  toast: document.getElementById("toast"),
  adminPanel: document.getElementById("adminPanel"),
  themeToggle: document.getElementById("themeToggle")
};

const formFields = {
  name: document.getElementById("adminName"),
  role: document.getElementById("adminRole"),
  slogan: document.getElementById("adminSlogan"),
  phone: document.getElementById("adminPhone"),
  whatsapp: document.getElementById("adminWhatsapp"),
  email: document.getElementById("adminEmail"),
  site: document.getElementById("adminSite"),
  instagram: document.getElementById("adminInstagram"),
  facebook: document.getElementById("adminFacebook"),
  linkedin: document.getElementById("adminLinkedin"),
  youtube: document.getElementById("adminYoutube"),
  mapUrl: document.getElementById("adminMap"),
  photo: document.getElementById("adminPhoto"),
  logo: document.getElementById("adminLogo"),
  cardUrl: document.getElementById("adminCardUrl"),
  nfcLink: document.getElementById("adminNfcLink"),
  metaTitle: document.getElementById("adminMetaTitle"),
  metaDescription: document.getElementById("adminMetaDescription"),
  ogImage: document.getElementById("adminOgImage"),
  gaId: document.getElementById("adminGaId"),
  metaPixelId: document.getElementById("adminMetaPixel"),
  catalogUrl: document.getElementById("adminCatalog"),
  primaryColor: document.getElementById("adminPrimaryColor"),
  darkColor: document.getElementById("adminDarkColor"),
  lightColor: document.getElementById("adminLightColor"),
  service1Title: document.getElementById("service1Title"),
  service1Text: document.getElementById("service1Text"),
  service2Title: document.getElementById("service2Title"),
  service2Text: document.getElementById("service2Text"),
  service3Title: document.getElementById("service3Title"),
  service3Text: document.getElementById("service3Text"),
  service4Title: document.getElementById("service4Title"),
  service4Text: document.getElementById("service4Text"),
  service5Title: document.getElementById("service5Title"),
  service5Text: document.getElementById("service5Text")
};

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return normalizeConfig(structuredClone(defaultConfig));
    }
    return normalizeConfig(deepMerge(structuredClone(defaultConfig), JSON.parse(raw)));
  } catch (error) {
    console.warn("Falha ao carregar configuração local.", error);
    return normalizeConfig(structuredClone(defaultConfig));
  }
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : { visits: 0, whatsapp: 0, shares: 0, vcf: 0 };
  } catch (error) {
    console.warn("Falha ao carregar estatísticas.", error);
    return { visits: 0, whatsapp: 0, shares: 0, vcf: 0 };
  }
}

function deepMerge(target, source) {
  Object.keys(source || {}).forEach((key) => {
    const value = source[key];
    if (Array.isArray(value)) {
      target[key] = value;
      return;
    }
    if (value && typeof value === "object") {
      target[key] = deepMerge(target[key] || {}, value);
      return;
    }
    target[key] = value;
  });
  return target;
}

function normalizeConfig(config) {
  if (!config.cardUrl) {
    config.cardUrl = defaultConfig.cardUrl;
  }
  if (!config.nfcLink) {
    config.nfcLink = config.cardUrl || defaultConfig.nfcLink;
  }
  if (!config.ogImage) {
    config.ogImage = defaultConfig.ogImage;
  }
  return config;
}

function currentCardUrl() {
  if (state.config.cardUrl) {
    return state.config.cardUrl;
  }
  if (window.location.protocol.startsWith("http")) {
    return window.location.href;
  }
  return fallbackCardUrl;
}

function normalizeWhatsapp(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatPhoneDisplay(value) {
  return String(value || "").trim();
}

function buildWhatsappUrl() {
  const number = normalizeWhatsapp(state.config.whatsapp || state.config.phone);
  const firstName = String(state.config.name || "André").trim().split(/\s+/)[0] || "André";
  const text = encodeURIComponent(`Olá ${firstName}, encontrei seu cartão digital e gostaria de mais informações.`);
  return `https://wa.me/${number}?text=${text}`;
}

function buildVcfContent() {
  const phone = formatPhoneDisplay(state.config.phone);
  const whatsapp = formatPhoneDisplay(state.config.whatsapp || state.config.phone);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${state.config.name}`,
    `ORG:${state.config.company}`,
    `TITLE:${state.config.role}`,
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `TEL;TYPE=WORK,VOICE:${whatsapp}`,
    `EMAIL;TYPE=INTERNET:${state.config.email}`,
    `URL:${state.config.site}`,
    `item1.URL:${state.config.instagram}`,
    "item1.X-ABLabel:Instagram",
    "NOTE:Cartão digital Flypay",
    "END:VCARD"
  ];
  return lines.join("\n");
}

function render() {
  const config = state.config;
  const cardUrl = currentCardUrl();
  const nfcLink = config.nfcLink || cardUrl;
  const whatsappUrl = buildWhatsappUrl();

  document.title = config.metaTitle || defaultConfig.metaTitle;
  setMeta('meta[name="description"]', "content", config.metaDescription);
  setMeta('meta[property="og:title"]', "content", config.metaTitle);
  setMeta('meta[property="og:description"]', "content", config.metaDescription);
  setMeta('meta[property="og:image"]', "content", config.ogImage || config.photo);
  setMeta('meta[property="og:url"]', "content", cardUrl);
  setMeta('meta[name="twitter:title"]', "content", config.metaTitle);
  setMeta('meta[name="twitter:description"]', "content", config.metaDescription);
  setMeta('meta[name="twitter:image"]', "content", config.ogImage || config.photo);
  setMeta('meta[name="theme-color"]', "content", config.colors.primary);

  document.documentElement.style.setProperty("--primary", config.colors.primary);
  document.documentElement.style.setProperty("--dark", config.colors.dark);
  document.documentElement.style.setProperty("--light", config.colors.light);

  elements.logoImage.src = config.logo;
  elements.profileImage.src = config.photo;
  elements.logoImage.alt = `Logo ${config.company}`;
  elements.profileImage.alt = `Foto de ${config.name}`;
  elements.displayName.textContent = config.name;
  elements.displayRole.textContent = config.role;
  elements.displaySlogan.textContent = config.slogan;

  elements.primaryWhatsapp.href = whatsappUrl;
  elements.floatingWhatsapp.href = whatsappUrl;
  elements.callButton.href = `tel:${normalizeTelForHref(config.phone)}`;
  elements.emailButton.href = `mailto:${config.email}`;
  elements.siteButton.href = config.site;
  elements.mapFrame.src = config.mapUrl;
  elements.catalogButton.href = config.catalogUrl;
  elements.nfcLinkOutput.textContent = nfcLink;

  renderSocialLinks(config);
  renderServices(config.services);
  renderTestimonials(config.testimonials);
  renderShareOptions(cardUrl);
  renderStats();
  renderQrCode(cardUrl);
  populateAdminForm();
  bootAnalytics();
}

function setMeta(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute(attribute, value || "");
  }
}

function normalizeTelForHref(value) {
  const cleaned = String(value || "").replace(/[^\d+]/g, "");
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

function renderSocialLinks(config) {
  const items = [
    { label: "Instagram", url: config.instagram, icon: "📸" },
    { label: "Facebook", url: config.facebook, icon: "📘" },
    { label: "LinkedIn", url: config.linkedin, icon: "💼" },
    { label: "YouTube", url: config.youtube, icon: "▶️" }
  ];

  elements.socialLinks.innerHTML = items.map((item) => `
    <a class="social-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
      <span>${item.icon} ${item.label}</span>
      <strong>abrir</strong>
    </a>
  `).join("");
}

function renderServices(services) {
  elements.servicesGrid.innerHTML = services.map((service) => `
    <article class="service-card">
      <strong>${escapeHtml(service.title)}</strong>
      <p>${escapeHtml(service.text)}</p>
    </article>
  `).join("");
}

function renderTestimonials(testimonials) {
  elements.testimonialsGrid.innerHTML = testimonials.map((testimonial) => `
    <article class="testimonial-card">
      <p>“${escapeHtml(testimonial.quote)}”</p>
      <footer>${escapeHtml(testimonial.author)}</footer>
    </article>
  `).join("");
}

function renderShareOptions(cardUrl) {
  const shareText = encodeURIComponent(`${state.config.name} • ${state.config.role}`);
  const encodedUrl = encodeURIComponent(cardUrl);
  const actions = [
    { label: "WhatsApp", url: `https://wa.me/?text=${shareText}%20${encodedUrl}` },
    { label: "Instagram", action: "instagram" },
    { label: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "Telegram", url: `https://t.me/share/url?url=${encodedUrl}&text=${shareText}` },
    { label: "E-mail", url: `mailto:?subject=${shareText}&body=${encodedUrl}` },
    { label: "SMS", url: `sms:?body=${shareText}%20${encodedUrl}` }
  ];

  elements.platformShareLinks.innerHTML = actions.map((item) => {
    if (item.action === "instagram") {
      return `<button class="ghost-button" type="button" data-share-action="instagram">${item.label}</button>`;
    }
    return `<a class="ghost-button" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a>`;
  }).join("");

  document.querySelectorAll("[data-share-action='instagram']").forEach((button) => {
    button.addEventListener("click", async () => {
      if (navigator.share) {
        await shareCard();
        return;
      }
      await copyText(cardUrl);
      showToast("Link copiado para compartilhar no Instagram.");
    });
  });
}

function renderStats() {
  elements.visitCount.textContent = state.stats.visits;
  elements.whatsappCount.textContent = state.stats.whatsapp;
  elements.shareCount.textContent = state.stats.shares;
  elements.vcfCount.textContent = state.stats.vcf;
}

function renderQrCode(cardUrl) {
  if (!window.QRious) {
    return;
  }
  if (!state.qr) {
    state.qr = new QRious({
      element: document.getElementById("qrCanvas"),
      size: 280,
      value: cardUrl,
      level: "H",
      foreground: "#121212",
      background: "#ffffff"
    });
    return;
  }
  state.qr.value = cardUrl;
}

function populateAdminForm() {
  const config = state.config;
  formFields.name.value = config.name;
  formFields.role.value = config.role;
  formFields.slogan.value = config.slogan;
  formFields.phone.value = config.phone;
  formFields.whatsapp.value = config.whatsapp;
  formFields.email.value = config.email;
  formFields.site.value = config.site;
  formFields.instagram.value = config.instagram;
  formFields.facebook.value = config.facebook;
  formFields.linkedin.value = config.linkedin;
  formFields.youtube.value = config.youtube;
  formFields.mapUrl.value = config.mapUrl;
  formFields.photo.value = config.photo;
  formFields.logo.value = config.logo;
  formFields.cardUrl.value = config.cardUrl;
  formFields.nfcLink.value = config.nfcLink;
  formFields.metaTitle.value = config.metaTitle;
  formFields.metaDescription.value = config.metaDescription;
  formFields.ogImage.value = config.ogImage;
  formFields.gaId.value = config.gaId;
  formFields.metaPixelId.value = config.metaPixelId;
  formFields.catalogUrl.value = config.catalogUrl;
  formFields.primaryColor.value = config.colors.primary;
  formFields.darkColor.value = config.colors.dark;
  formFields.lightColor.value = config.colors.light;

  config.services.forEach((service, index) => {
    formFields[`service${index + 1}Title`].value = service.title;
    formFields[`service${index + 1}Text`].value = service.text;
  });
}

function readConfigFromForm() {
  return {
    ...state.config,
    name: formFields.name.value.trim(),
    role: formFields.role.value.trim(),
    slogan: formFields.slogan.value.trim(),
    phone: formFields.phone.value.trim(),
    whatsapp: formFields.whatsapp.value.trim(),
    email: formFields.email.value.trim(),
    site: formFields.site.value.trim(),
    instagram: formFields.instagram.value.trim(),
    facebook: formFields.facebook.value.trim(),
    linkedin: formFields.linkedin.value.trim(),
    youtube: formFields.youtube.value.trim(),
    mapUrl: formFields.mapUrl.value.trim(),
    photo: formFields.photo.value.trim(),
    logo: formFields.logo.value.trim(),
    cardUrl: formFields.cardUrl.value.trim(),
    nfcLink: formFields.nfcLink.value.trim(),
    metaTitle: formFields.metaTitle.value.trim(),
    metaDescription: formFields.metaDescription.value.trim(),
    ogImage: formFields.ogImage.value.trim(),
    gaId: formFields.gaId.value.trim(),
    metaPixelId: formFields.metaPixelId.value.trim(),
    catalogUrl: formFields.catalogUrl.value.trim(),
    colors: {
      primary: formFields.primaryColor.value,
      dark: formFields.darkColor.value,
      light: formFields.lightColor.value
    },
    services: Array.from({ length: 5 }, (_, index) => ({
      title: formFields[`service${index + 1}Title`].value.trim(),
      text: formFields[`service${index + 1}Text`].value.trim()
    }))
  };
}

function saveConfig() {
  state.config = normalizeConfig(readConfigFromForm());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.config));
  render();
  showToast("Alterações salvas com sucesso.");
}

function resetConfig() {
  state.config = normalizeConfig(structuredClone(defaultConfig));
  localStorage.removeItem(STORAGE_KEY);
  render();
  showToast("Configuração padrão restaurada.");
}

function exportConfig() {
  const blob = new Blob([JSON.stringify(state.config, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "flypay-cartao-config.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importConfig(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      state.config = normalizeConfig(deepMerge(structuredClone(defaultConfig), parsed));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.config));
      render();
      showToast("Configuração importada.");
    } catch (error) {
      showToast("Não foi possível importar o JSON.");
    }
  };
  reader.readAsText(file);
}

function openAdminPanel() {
  elements.adminPanel.classList.add("is-open");
  elements.adminPanel.setAttribute("aria-hidden", "false");
}

function closeAdminPanel() {
  elements.adminPanel.classList.remove("is-open");
  elements.adminPanel.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function trackStat(type) {
  state.stats[type] += 1;
  localStorage.setItem(STATS_KEY, JSON.stringify(state.stats));
  renderStats();
}

function registerVisit() {
  if (!sessionStorage.getItem(SESSION_VISIT_KEY)) {
    state.stats.visits += 1;
    localStorage.setItem(STATS_KEY, JSON.stringify(state.stats));
    sessionStorage.setItem(SESSION_VISIT_KEY, "true");
  }
}

async function downloadVcf() {
  const blob = new Blob([buildVcfContent()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "andre-rubim-flypay.vcf";
  link.click();
  URL.revokeObjectURL(url);
  trackStat("vcf");
  showToast("Contato pronto para salvar.");
}

function downloadQrCode() {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qr-code-cartao-andre-rubim.png";
  link.click();
}

async function shareQrCode() {
  const canvas = document.getElementById("qrCanvas");
  const cardUrl = currentCardUrl();

  if (navigator.canShare && navigator.share) {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        showToast("Não foi possível gerar o QR Code.");
        return;
      }

      const file = new File([blob], "qr-code-andre-rubim.png", { type: "image/png" });
      try {
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: state.config.metaTitle,
            text: "QR Code do cartão digital Flypay",
            files: [file],
            url: cardUrl
          });
          trackStat("shares");
          return;
        }
      } catch (error) {
        console.warn("Falha ao compartilhar arquivo.", error);
      }

      await shareCard();
    }, "image/png");
    return;
  }

  await shareCard();
}

function printQrCode() {
  const canvas = document.getElementById("qrCanvas");
  const dataUrl = canvas.toDataURL("image/png");
  const printWindow = window.open("", "_blank", "width=600,height=700");
  if (!printWindow) {
    showToast("Permita pop-ups para imprimir o QR Code.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head><title>Imprimir QR Code</title></head>
      <body style="font-family: Arial, sans-serif; text-align:center; padding:32px;">
        <h1>${state.config.name}</h1>
        <p>${state.config.role}</p>
        <img src="${dataUrl}" alt="QR Code" style="width:280px; height:280px;">
        <p>${currentCardUrl()}</p>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

async function shareCard() {
  const cardUrl = currentCardUrl();
  const payload = {
    title: state.config.metaTitle,
    text: state.config.metaDescription,
    url: cardUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(payload);
      trackStat("shares");
      return;
    } catch (error) {
      if (error && error.name === "AbortError") {
        return;
      }
    }
  }

  await copyText(cardUrl);
  trackStat("shares");
  showToast("Link copiado para compartilhamento.");
}

function toggleTheme() {
  const current = elements.html.getAttribute("data-theme");
  const nextTheme = current === "dark" ? "light" : "dark";
  elements.html.setAttribute("data-theme", nextTheme);
  localStorage.setItem("flypay-theme", nextTheme);
}

function restoreTheme() {
  const savedTheme = localStorage.getItem("flypay-theme");
  if (savedTheme) {
    elements.html.setAttribute("data-theme", savedTheme);
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let currentGaId = "";
let currentMetaPixelId = "";

function bootAnalytics() {
  const { gaId, metaPixelId } = state.config;

  if (gaId === currentGaId && metaPixelId === currentMetaPixelId) {
    return;
  }

  document.querySelectorAll("script[data-flypay-analytics]").forEach((node) => node.remove());

  if (gaId) {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.dataset.flypayAnalytics = "ga";
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(gaScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  if (metaPixelId) {
    const pixelScript = document.createElement("script");
    pixelScript.dataset.flypayAnalytics = "meta-pixel";
    pixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaPixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(pixelScript);
  }

  currentGaId = gaId;
  currentMetaPixelId = metaPixelId;
}

function bindEvents() {
  document.getElementById("openAdmin").addEventListener("click", openAdminPanel);
  document.getElementById("closeAdmin").addEventListener("click", closeAdminPanel);
  document.getElementById("saveConfigButton").addEventListener("click", saveConfig);
  document.getElementById("resetConfigButton").addEventListener("click", resetConfig);
  document.getElementById("exportConfigButton").addEventListener("click", exportConfig);
  document.getElementById("importConfigInput").addEventListener("change", (event) => {
    const [file] = event.target.files || [];
    if (file) {
      importConfig(file);
    }
  });

  document.getElementById("saveContactButton").addEventListener("click", downloadVcf);
  document.getElementById("downloadQrButton").addEventListener("click", downloadQrCode);
  document.getElementById("shareQrButton").addEventListener("click", shareQrCode);
  document.getElementById("printQrButton").addEventListener("click", printQrCode);
  document.getElementById("nativeShareButton").addEventListener("click", shareCard);
  document.getElementById("copyNfcLink").addEventListener("click", async () => {
    await copyText(elements.nfcLinkOutput.textContent);
    showToast("Link NFC copiado.");
  });
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.primaryWhatsapp.addEventListener("click", () => trackStat("whatsapp"));
  elements.floatingWhatsapp.addEventListener("click", () => trackStat("whatsapp"));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAdminPanel();
    }
  });
}

function init() {
  restoreTheme();
  registerVisit();
  bindEvents();
  render();
}

init();
