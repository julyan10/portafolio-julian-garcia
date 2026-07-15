const storageKey = "julian-portfolio-projects";

const starterProjects = [
  {
    id: "dashboard-bi",
    title: "Dashboard ejecutivo de seguimiento y análisis",
    category: "Power BI",
    description:
      "GIF interactivo con pantallazos de un tablero BI para visualizar indicadores, tendencias, filtros y análisis ejecutivo orientado a la toma de decisiones.",
    media: "https://github.com/julyan10/portafolio-julian-garcia/blob/main/Pantallazos.gif?raw=true",
    link: "",
  },
  {
    id: "automatizacion-reportes",
    title: "Automatización ETL/ELT y reducción de tiempos",
    category: "Python",
    description:
      "Arquitecturas ETL/ELT, scripts y flujos automatizados con Python, R, Power Platform, Azure, Fabric, Databricks y JobScheduler. Logro destacado: reducción de tiempos de ejecución en 50%.",
    media: "",
    link: "",
  },
  {
    id: "amazon-sales-dashboard",
    title: "Dashboard de ventas Amazon",
    category: "Power BI",
    description:
      "Análisis interactivo de ventas, reseñas y variaciones MTD/YTD por año y categoría. El tablero permite identificar productos con mayor aporte, cambios de desempeño y comportamiento histórico para decisiones comerciales.",
    media: "assets/Amazon.gif",
    link: "",
  },
  {
    id: "digital-marketing-dashboard",
    title: "Panel de desempeño de marketing digital",
    category: "Power BI",
    description:
      "Dashboard interactivo para analizar campañas digitales por canal, tipo de campaña, conversión, inversión, funnel de email, viralidad y segmentos de audiencia por ingresos, género y rango de edad.",
    media: "assets/Marketing.gif",
    link: "",
  },
  {
    id: "ia-productividad",
    title: "IA, LLM/RAG y agentes inteligentes",
    category: "IA",
    description:
      "Desarrollo e implementación de modelos de IA, ML/DL, LLM/RAG, LangChain, LangGraph, web scraping y agentes inteligentes para captura, clasificación, estructuración y análisis de información.",
    media: "",
    link: "",
  },
  {
    id: "big-data-cloud",
    title: "Big Data y ecosistemas cloud",
    category: "Operaciones",
    description:
      "Trabajo con SQL, NoSQL, PostgreSQL, PySpark, Azure Data Factory, Fabric, Databricks, GCP, AWS, DWH, ERP, CRM, WMS y APIs para integrar fuentes y asegurar calidad de datos.",
    media: "",
    link: "",
  },
];

const grid = document.querySelector("[data-project-grid]");
const template = document.querySelector("[data-project-template]");
const dialog = document.querySelector("[data-project-dialog]");
const form = document.querySelector("[data-project-form]");
const mediaDialog = document.querySelector("[data-media-dialog]");
const mediaImage = document.querySelector("[data-media-image]");
const mediaTitle = document.querySelector("[data-media-title]");
const mediaCategory = document.querySelector("[data-media-category]");
const mediaDescription = document.querySelector("[data-media-description]");
const mediaLink = document.querySelector("[data-media-link]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
let activeFilter = "all";

function readProjects() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  return [...starterProjects, ...saved];
}

function writeUserProjects(projects) {
  const userProjects = projects.filter((project) => !starterProjects.some((starter) => starter.id === project.id));
  localStorage.setItem(storageKey, JSON.stringify(userProjects));
}

function renderProjects() {
  const projects = readProjects().filter((project) => activeFilter === "all" || project.category === activeFilter);
  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = template.content.cloneNode(true);
    const article = card.querySelector(".project-card");
    const media = card.querySelector(".project-media");
    const tag = card.querySelector(".project-tag");
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const link = card.querySelector(".project-link");
    const deleteButton = card.querySelector(".delete-project");

    article.dataset.id = project.id;
    tag.textContent = project.category;
    title.textContent = project.title;
    description.textContent = project.description;

    if (project.media) {
      const image = document.createElement("img");
      image.src = project.media;
      image.alt = `Vista previa de ${project.title}`;
      media.appendChild(image);
      media.classList.add("has-media");
      media.setAttribute("role", "button");
      media.setAttribute("tabindex", "0");
      media.setAttribute("aria-label", `Ampliar ${project.title}`);
      media.addEventListener("click", () => openMediaViewer(project));
      media.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openMediaViewer(project);
        }
      });
    } else {
      media.textContent = "Añade aquí un GIF, screenshot o demo";
    }

    if (project.link) {
      link.href = project.link;
      link.hidden = false;
    } else {
      link.hidden = true;
    }

    if (starterProjects.some((starter) => starter.id === project.id)) {
      deleteButton.hidden = true;
    }

    deleteButton.addEventListener("click", () => {
      const nextProjects = readProjects().filter((item) => item.id !== project.id);
      writeUserProjects(nextProjects);
      renderProjects();
    });

    grid.appendChild(card);
  });
}

function openMediaViewer(project) {
  mediaImage.src = project.media;
  mediaImage.alt = `Vista ampliada de ${project.title}`;
  mediaTitle.textContent = project.title;
  mediaCategory.textContent = project.category;
  mediaDescription.textContent = project.description;

  if (project.link) {
    mediaLink.href = project.link;
    mediaLink.hidden = false;
  } else {
    mediaLink.hidden = true;
  }

  mediaDialog.showModal();
}

document.querySelector("[data-open-form]").addEventListener("click", () => dialog.showModal());
document.querySelector("[data-close-form]").addEventListener("click", () => dialog.close());
document.querySelector("[data-close-media]").addEventListener("click", () => mediaDialog.close());

mediaDialog.addEventListener("click", (event) => {
  if (event.target === mediaDialog) {
    mediaDialog.close();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const project = {
    id: crypto.randomUUID(),
    title: data.get("title").trim(),
    category: data.get("category"),
    description: data.get("description").trim(),
    media: data.get("media").trim(),
    link: data.get("link").trim(),
  };

  const projects = readProjects();
  writeUserProjects([...projects, project]);
  form.reset();
  dialog.close();
  renderProjects();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProjects();
  });
});

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

renderProjects();
