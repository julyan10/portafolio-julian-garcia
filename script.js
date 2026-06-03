const storageKey = "julian-portfolio-projects";

const starterProjects = [
  {
    id: "dashboard-bi",
    title: "Dashboards ejecutivos y seguimiento de KPIs",
    category: "Power BI",
    description:
      "Modelos de reportería en Power BI, Tableau, Looker Studio y Qlik Sense para seguimiento operativo, comercial y gerencial.",
    media: "",
    link: "",
  },
  {
    id: "automatizacion-reportes",
    title: "Automatización ETL y reducción de tiempos",
    category: "Python",
    description:
      "Arquitecturas ETL, scripts y flujos automatizados con Python, R, Power Platform, Azure, Fabric y JobScheduler. Logro destacado: reducción de tiempos de ejecución en 50%.",
    media: "",
    link: "",
  },
  {
    id: "ia-productividad",
    title: "IA, ML, DL y agentes inteligentes",
    category: "IA",
    description:
      "Desarrollo e implementación de modelos de IA, analítica avanzada, web scraping y agentes inteligentes para captura, estructuración y análisis de información.",
    media: "",
    link: "",
  },
  {
    id: "big-data-cloud",
    title: "Big Data y ecosistemas cloud",
    category: "Operaciones",
    description:
      "Trabajo con SQL, NoSQL, PostgreSQL, PySpark, Azure Data Factory, AWS, DWH, ERP, CRM y WMS para integrar fuentes de información y asegurar calidad de datos.",
    media: "",
    link: "",
  },
];

const grid = document.querySelector("[data-project-grid]");
const template = document.querySelector("[data-project-template]");
const dialog = document.querySelector("[data-project-dialog]");
const form = document.querySelector("[data-project-form]");
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

document.querySelector("[data-open-form]").addEventListener("click", () => dialog.showModal());
document.querySelector("[data-close-form]").addEventListener("click", () => dialog.close());

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
