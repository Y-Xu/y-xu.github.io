document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("nav-overlay");

  function toggleMenu() {
    menuToggle.classList.toggle("active");

    if (!navLinks.classList.contains("active")) {
      // Opening menu
      overlay.style.display = "block";
      // Force browser reflow
      overlay.offsetHeight;
      overlay.classList.add("active");
      navLinks.classList.add("active");
    } else {
      // Closing menu
      overlay.classList.remove("active");
      navLinks.classList.remove("active");
      // Wait for transition to finish before hiding
      setTimeout(() => {
        overlay.style.display = "none";
      }, 300); // Match transition duration
    }

    // document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  // Toggle menu when hamburger is clicked
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when overlay is clicked
  overlay.addEventListener("click", () => {
    toggleMenu();
  });

  // Close menu when clicking nav links
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  // --------------------------------------------- // 折叠配置
  foldConfigs = [
    {
      containerId: "news",
      defaultShowItems: 6,
    },
    // 会议论文
    {
      containerId: "selectedConferencePapers",
      defaultShowItems: 10,
    },
    // 期刊论文
    {
      containerId: "selectedJournalPapers",
      defaultShowItems: 10,
    },
    // 项目
    {
      containerId: "projects",
      defaultShowItems: 10,
    },
    // 课程
    {
      containerId: "teaching",
      defaultShowItems: 10,
    },
  ];
  for (const config of foldConfigs) {
    ListFold(config);
  }
  // --------------------------------------------- // 折叠配置
});

var emU = "xuyangcs";
var emD = "ustc.edu.cn";
var emP = [emU, emD];
var emA = emP.join("@");
function displayEmail() {
  document.getElementById("pem1").innerHTML = "Email: " + emA;
  document.getElementById("pem2").innerHTML =
    '© 2025 Yang Xu - All Rights Reserved | <a href="mailto:' +
    emA +
    '">Contact Me</a>';
}
const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    // themeButton.innerHTML = `Light`; // “Light” mode
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    // themeButton.innerHTML = `Dark`; // “Dark” mode
  }
});
// --------------------------------------------------------- // 折叠功能
function formatConfig(config) {
  const pCount = document
    .getElementById(config.containerId)
    .querySelectorAll("p").length;
  const liCount = document
    .getElementById(config.containerId)
    .querySelectorAll("li").length;
  if (pCount > 0 && liCount <= 0) {
    config["itemSelector"] = "p";
    config["totalItems"] = pCount;
  } else if (liCount > 0 && pCount <= 0) {
    config["itemSelector"] = "li";
    config["totalItems"] = liCount;
  }
  return config;
}
function ListFold(config) {
  config = formatConfig(config);

  // 获取容器元素
  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`容器元素 #${config.containerId} 不存在`);
    return;
  }

  // 获取所有项目
  // const items = container.querySelectorAll(config.itemSelector);
  const totalItems = config.totalItems;

  // 如果不需要折叠功能
  if (config.defaultShowItems >= totalItems) {
    return;
  }

  // 创建样式元素
  const styleId = `list-fold-style-${config.containerId}`;
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }
  if (config.itemSelector == "p") {
    // 添加折叠样式规则
    style.sheet.insertRule(
      `#${config.containerId} ${config.itemSelector}:nth-of-type(n + ${
        config.defaultShowItems + 1
      }) {
                          max-height: 0;
                          opacity: 0;
                          overflow: hidden;
                          padding-top: 0;
                          padding-bottom: 0;
                          margin-top: 0;
                          margin-bottom: 0;
                          transition: all 0.5s ease;
                      }`,
      style.sheet.cssRules.length
    );

    // 添加展开样式规则
    style.sheet.insertRule(
      `#${config.containerId}.show-all ${config.itemSelector}:nth-of-type(n + ${
        config.defaultShowItems + 1
      }) {
                          max-height: 100px;
                          opacity: 1;
                          margin: 16px 0;
                      }`,
      style.sheet.cssRules.length
    );
  } else if (config.itemSelector == "li") {
    // 添加折叠样式规则
    style.sheet.insertRule(
      `#${config.containerId} ${config.itemSelector}:nth-of-type(n + ${
        config.defaultShowItems + 1
      }) {
                          max-height: 0;
                          opacity: 0;
                          overflow: hidden;
                          transition: all 0.5s ease;
                      }`,
      style.sheet.cssRules.length
    );

    // 添加展开样式规则
    style.sheet.insertRule(
      `#${config.containerId}.show-all ${config.itemSelector}:nth-of-type(n + ${
        config.defaultShowItems + 1
      }) {
                          display: list-item;
                          max-height: 100px;
                          opacity: 1;
                          transition: all 0.5s ease;
                      }`,
      style.sheet.cssRules.length
    );
  }

  const newsContainer = document.getElementById(config.containerId);
  const controlsContainer = document.createElement("div");
  controlsContainer.className = "controls-container";
  newsContainer.appendChild(controlsContainer);

  const moreBtn = document.createElement("span");
  moreBtn.className = "btn";
  moreBtn.innerHTML = `<span class='stats'>${1}-${
    config.defaultShowItems
  }</\span> <i class="fas fa-angles-down"></i>`;

  moreBtn.addEventListener("click", function () {
    if (newsContainer.classList.contains("show-all")) {
      newsContainer.classList.remove("show-all");
      moreBtn.innerHTML = `<span class='stats'>${1}-${
        config.defaultShowItems
      }</\span> <i class="fas fa-angles-down"></i>`;
      moreBtn.classList.remove("hide");
      return;
    } else {
      newsContainer.classList.add("show-all");
      moreBtn.innerHTML = `<span class='stats'>${1}-${totalItems}</\span> <i class="fas fa-angles-up"></i>`;
      moreBtn.classList.add("hide");
    }
  });
  controlsContainer.appendChild(moreBtn);
}
// --------------------------------------------------------- // 折叠功能
