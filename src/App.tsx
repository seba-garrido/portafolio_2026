import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import "./App.css";

type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
};

type CaseStudy = {
  problem: string;
  approach: string;
  result: string;
  nextSteps: string;
  flow: string[];
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  impact: string[];
  tech: string[];
  categories: string[];
  images: string[];
  caseStudy: CaseStudy;
  video?: string;
};

type Skill = {
  name: string;
  image?: string;
};

type LightboxImage = {
  src: string;
  alt: string;
  title: string;
};

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/seba-garrido" },
  { label: "GitHub", href: "https://github.com/seba-garrido" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/sebastian_garri1" },
  { label: "CV", href: "/CV_2026.pdf" },
];

const navItems = [
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "monitor", label: "Monitor" },
  { id: "capacidades", label: "Capacidades" },
  { id: "skills", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

const projectFilters = ["Todos", "Cloud", "Data", "Frontend", "GIS", "Producto"];

const experiences: Experience[] = [
  {
    period: "Sep. 2025 - Presente",
    role: "Data Engineer & Cloud",
    company: "Scotiabank",
    description:
      "Desarrollo de workers para un proyecto de actualización de renta basado en OCR y LLM, encargados de normalizar datos, obtener cotizaciones y preparar la información para su integración con Scotiaflow. Habilitación, configuración y testeo de ambientes en Google Cloud Platform, incluyendo servicios como Vertex AI, Cloud Run, Cloud SQL y Cloud Functions. Creación y ejecución de pipelines de datos integrados con Jenkins y Argo Workflows, orientados a extraer información desde Bitbucket, transformarla y almacenarla en tablas de MongoDB.",
    tech: ["Python", "GCP", "Vertex AI", "Cloud Run", "Cloud SQL", "Cloud Functions", "Jenkins", "Argo", "Bitbucket", "MongoDB"],
  },
  {
    period: "Ene. 2025 - Ago. 2025",
    role: "Desarrollador de Software",
    company: "INNVATTI Group",
    description:
      "Desarrollo de un sistema WMS con foco en flujos de negocio, optimización de procedimientos almacenados en SQL Server, automatización de tareas administrativas con Python y mejora de consultas complejas para rendimiento del sistema.",
    tech: ["Python", "SQL Server", "WMS", "Stored Procedures", "Automatización"],
  },
  {
    period: "Ene. 2025 - Jun. 2025",
    role: "Ingeniero de Software",
    company: "Geodev Spa.",
    description:
      "Modelado de bases de datos relacionales para proyectos GIS, desarrollo de pipelines ETL geoespaciales, configuración de jobs en Jenkins, formularios en ArcGIS conectados a bases de datos y automatización de procesos con Python y APIs.",
    tech: ["Python", "ArcGIS", "ETL", "Jenkins", "SQL", "APIs"],
  },
  {
    period: "Aug. 2022 - Mar. 2023",
    role: "Desarrollador de Software",
    company: "Geodev Spa.",
    description:
      "Desarrollo de una aplicación móvil para monitoreo de maquinaria y personal, con programación en Python, gestión de bases de datos MySQL y PostgreSQL, y trabajo colaborativo con equipos de UI/UX y aseguramiento de calidad.",
    tech: ["Python", "QML", "MySQL", "PostgreSQL", "QA"],
  },
  {
    period: "Jan. 2021 - Mar. 2021",
    role: "Práctica Profesional I",
    company: "Ingeniería y Construcción Sigdo Koppers S.A.",
    description:
      "Desarrollo de una aplicación web para visualizar KPIs en televisores de la empresa e integración de dashboards de PowerBI en un carrusel web.",
    tech: ["JavaScript", "Power BI", "HTML", "CSS", "Dashboards"],
  },
];

const projects: Project[] = [
  {
    title: "Calendario móvil forestal",
    subtitle: "App móvil para gestión operativa",
    description:
      "Proyecto construido para apoyar la planificación de actividades en terreno, con una interfaz enfocada en seguimiento por fechas y consulta rápida.",
    impact: ["Vista tipo calendario", "Capturas reales del flujo", "Demo funcional en video"],
    tech: ["QML", "SQLite", "Python", "HTML", "CSS"],
    categories: ["Producto", "Frontend"],
    images: ["/images/calendario2.png", "/images/calendario1.png", "/images/calendario3.jpg"],
    video: "/videos/demo_calendario.mov",
    caseStudy: {
      problem:
        "Centralizar planificación y consulta de actividades en terreno con una experiencia rápida para usuarios operativos.",
      approach:
        "Diseñé una interfaz móvil con calendario, persistencia local y flujos simples para consultar información sin fricción.",
      result:
        "Base funcional para mostrar planificación, detalle de actividades y una demo visual del flujo completo.",
      nextSteps:
        "Agregar sincronización, roles, estados offline y métricas de uso cuando exista data real del proceso.",
      flow: ["Usuario móvil", "Calendario", "Detalle operativo", "SQLite", "Reporte"],
    },
  },
  {
    title: "Carrusel de dashboards",
    subtitle: "Visualización web para PowerBI",
    description:
      "Aplicación web creada para exponer tableros de datos en formato carrusel, pensada para pantallas de monitoreo y lectura rápida.",
    impact: ["Rotación de información", "Diseño para pantallas", "Proyecto de práctica profesional"],
    tech: ["JavaScript", "HTML", "CSS", "PowerBI"],
    categories: ["Frontend", "Data"],
    images: ["/images/arauco1.png", "/images/arauco2.png", "/images/arauco3.png"],
    caseStudy: {
      problem:
        "Mostrar KPIs de forma continua en pantallas compartidas, sin interacción manual ni navegación pesada.",
      approach:
        "Construí una experiencia web tipo carrusel para alternar dashboards y mantener foco en lectura rápida.",
      result:
        "Visualización estable para pantallas de monitoreo, con estructura lista para integrar más reportes.",
      nextSteps:
        "Conectar configuración dinámica de dashboards, horarios de rotación y estados de disponibilidad.",
      flow: ["Power BI", "Carrusel web", "Pantalla TV", "KPI", "Lectura rápida"],
    },
  },
  {
    title: "Sistema WMS",
    subtitle: "Gestión operativa para bodega",
    description:
      "Sistema Warehouse Management System desarrollado con foco en flujos de negocio, rendimiento de consultas y automatización de tareas administrativas para operaciones logísticas.",
    impact: [
      "Flujos WMS para procesos de negocio",
      "Procedimientos almacenados en SQL Server",
      "Automatizaciones con Python",
    ],
    tech: ["SQL Server", "Python", "REST APIs", "WMS", "Optimización SQL"],
    categories: ["Producto", "Data"],
    images: [
      "https://images.unsplash.com/photo-1749244768351-2726dc23d26c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1721937127582-ed331de95a04?auto=format&fit=crop&w=1200&q=80",
    ],
    caseStudy: {
      problem:
        "Ordenar flujos de bodega y mejorar rendimiento de consultas asociadas a operaciones logísticas.",
      approach:
        "Trabajé sobre lógica de negocio, procedimientos almacenados, automatizaciones y consultas SQL complejas.",
      result:
        "Mejoras orientadas a trazabilidad operativa, tiempos de respuesta y mantención del sistema.",
      nextSteps:
        "Agregar indicadores de picking, recepción, despacho y alertas de cuello de botella.",
      flow: ["Operación", "API", "SQL Server", "Procedimientos", "Reportes"],
    },
  },
  {
    title: "Pipeline ETL geoespacial",
    subtitle: "Datos GIS, automatización y despliegue",
    description:
      "Pipeline de datos para ingesta, transformación y validación de información geoespacial, integrando bases relacionales, scripts Python, jobs en Jenkins y formularios ArcGIS.",
    impact: [
      "Ingesta y transformación de datos geoespaciales",
      "Jobs automatizados en Jenkins",
      "Validación de calidad por etapa",
    ],
    tech: ["Python", "ArcGIS", "ETL", "SQL Server", "Jenkins", "Bash"],
    categories: ["Data", "GIS", "Cloud"],
    images: [
      "https://images.unsplash.com/photo-1698087908802-baae881e41e6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1687603921109-46401b201195?auto=format&fit=crop&w=1200&q=80",
    ],
    caseStudy: {
      problem:
        "Automatizar ingesta y validación de datos geoespaciales para reducir trabajo manual y errores por etapa.",
      approach:
        "Implementé pipelines con Python, formularios ArcGIS, jobs Jenkins y bases relacionales para validar datos.",
      result:
        "Flujo ETL documentable, trazable y preparado para crecer con nuevas fuentes geoespaciales.",
      nextSteps:
        "Agregar dashboard de calidad, validaciones espaciales y alertas por job fallido.",
      flow: ["ArcGIS", "Python ETL", "Jenkins", "SQL", "Validación"],
    },
  },
  {
    title: "Workers y pipelines cloud",
    subtitle: "Scotiabank | GCP, OCR y datos",
    description:
      "Workers para actualización de renta basada en OCR y LLM, junto con ambientes GCP y pipelines de datos integrados con Jenkins y Argo Workflows.",
    impact: [
      "Workers para procesamiento documental con OCR y LLMs",
      "Habilitación, configuración y testeo de ambientes GCP",
      "Extracción desde Bitbucket y carga en MongoDB",
    ],
    tech: [
      "Python",
      "Google Cloud",
      "Vertex AI",
      "Cloud Run",
      "Cloud Functions",
      "Cloud SQL",
      "Jenkins",
      "Argo Workflows",
      "Bitbucket",
      "MongoDB",
    ],
    categories: ["Cloud", "Data"],
    images: [
      "https://images.unsplash.com/photo-1764231467852-b609a742e082?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=80",
    ],
    caseStudy: {
      problem:
        "Preparar información documental y de renta para integrarla a flujos internos con datos normalizados.",
      approach:
        "Desarrollé workers, habilité ambientes GCP y ejecuté pipelines Jenkins/Argo para transformar y persistir datos.",
      result:
        "Base cloud para procesamiento documental, extracción desde repositorios y almacenamiento en MongoDB.",
      nextSteps:
        "Agregar métricas reales de ejecución, observabilidad por worker y trazabilidad por documento.",
      flow: ["Bitbucket", "Jenkins", "Argo", "Workers GCP", "MongoDB", "Scotiaflow"],
    },
  },
  {
    title: "Portafolio personal",
    subtitle: "Identidad profesional y proyectos",
    description:
      "Evolución del portafolio original hacia una experiencia más moderna, responsive y orientada a mostrar trabajo real con mejor jerarquía visual.",
    impact: ["Experiencia responsive", "Secciones claras", "Links profesionales"],
    tech: ["React", "TypeScript", "Vite", "CSS"],
    categories: ["Frontend", "Producto"],
    images: ["/images/react.svg", "/images/javascript.svg", "/images/css.svg"],
    caseStudy: {
      problem:
        "Presentar experiencia, proyectos y stack con una narrativa más clara y una interfaz moderna.",
      approach:
        "Construí una SPA responsive con secciones escaneables, visuales de proyectos, lightbox y assets propios.",
      result:
        "Portfolio listo para evolucionar con casos de estudio, dashboards y proyectos personales.",
      nextSteps:
        "Conectar proyectos reales, métricas y repositorios públicos con demos desplegadas.",
      flow: ["React", "CSS", "Assets", "Vercel", "Portfolio"],
    },
  },
];

const featuredImages: LightboxImage[] = [
  {
    src: "/images/calendario2.png",
    alt: "Captura de calendario móvil",
    title: "Calendario móvil forestal",
  },
  {
    src: "/images/calendario1.png",
    alt: "Captura de detalle calendario",
    title: "Calendario móvil forestal",
  },
  {
    src: "/images/calendario3.jpg",
    alt: "Captura adicional del proyecto",
    title: "Calendario móvil forestal",
  },
];

const skills: Skill[] = [
  { name: "Python", image: "/images/python.svg" },
  { name: "SQL", image: "/images/sql.svg" },
  { name: "React", image: "/images/react.svg" },
  { name: "JavaScript", image: "/images/javascript.svg" },
  { name: "HTML5", image: "/images/html5.svg" },
  { name: "CSS", image: "/images/css.svg" },
  { name: "MySQL", image: "/images/mysql.svg" },
  { name: "PostgreSQL", image: "/images/postgresql.svg" },
  { name: "SQL Server", image: "/images/sql-server.svg" },
  { name: "MongoDB", image: "/images/mongodb.svg" },
  { name: "Google Cloud", image: "/images/google-cloud.svg" },
  { name: "Vertex AI", image: "/images/vertex-ai.svg" },
  { name: "Cloud Run", image: "/images/cloud-run.svg" },
  { name: "Cloud SQL", image: "/images/cloud-sql.svg" },
  { name: "Cloud Functions", image: "/images/cloud-functions.svg" },
  { name: "ETL", image: "/images/etl.svg" },
  { name: "Bitbucket", image: "/images/bitbucket.svg" },
  { name: "Jenkins", image: "/images/jenkins.svg" },
  { name: "Argo Workflows", image: "/images/argo-workflows.svg" },
  { name: "ArcGIS", image: "/images/arcgis.svg" },
  { name: "Power BI", image: "/images/power-bi.svg" },
  { name: "FastAPI", image: "/images/fastapi.svg" },
  { name: "Django", image: "/images/django.svg" },
  { name: "Pandas", image: "/images/pandas.svg" },
  { name: "Machine Learning", image: "/images/machine-learning.svg" },
  { name: "Java", image: "/images/java.svg" },
  { name: "QML", image: "/images/qml.svg" },
  { name: "SQLite", image: "/images/sqlite.svg" },
];

const monitorStats = [
  { label: "Pipelines modelados", value: "08", detail: "placeholder" },
  { label: "Workers documentados", value: "12", detail: "placeholder" },
  { label: "Servicios cloud", value: "05", detail: "GCP" },
  { label: "Casos por completar", value: "06", detail: "roadmap" },
];

const monitorRows = [
  { name: "sync-bitbucket-mongo", status: "Diseño", progress: 72 },
  { name: "etl-gis-validation", status: "Pendiente data", progress: 46 },
  { name: "wms-query-tuning", status: "Documentar", progress: 64 },
  { name: "portfolio-case-studies", status: "Activo", progress: 88 },
];

const personalProjectIdeas = [
  {
    title: "Monitor de pipelines",
    description:
      "App con ejecución simulada de jobs, logs, reintentos, estados y métricas de duración.",
    stack: ["React", "FastAPI", "MongoDB", "Docker"],
  },
  {
    title: "ETL público con dashboard",
    description:
      "Ingesta desde APIs abiertas, limpieza con Python y visualización de datos en un dashboard propio.",
    stack: ["Python", "PostgreSQL", "Pandas", "Charts"],
  },
  {
    title: "Mapa operativo GIS",
    description:
      "Visualizador geoespacial con filtros, capas y marcadores conectados a una API backend.",
    stack: ["MapLibre", "FastAPI", "PostGIS", "React"],
  },
];

const capabilityMap = [
  {
    area: "Frontend",
    summary: "Interfaces claras, responsivas y pensadas para flujos reales.",
    points: ["React y TypeScript", "Dashboards operativos", "Experiencia mobile", "Componentes reutilizables"],
  },
  {
    area: "Backend",
    summary: "Servicios y automatizaciones para sostener lógica de negocio.",
    points: ["Python", "APIs REST", "FastAPI/Django", "Jobs y workers"],
  },
  {
    area: "Data",
    summary: "Modelado, transformación y consulta de datos para operaciones.",
    points: ["ETL", "SQL", "MongoDB", "Pandas"],
  },
  {
    area: "Cloud",
    summary: "Ambientes y servicios cloud listos para integración.",
    points: ["Google Cloud", "Cloud Run", "Cloud SQL", "Cloud Functions"],
  },
  {
    area: "GIS",
    summary: "Flujos geoespaciales conectados a datos y validaciones.",
    points: ["ArcGIS", "Pipelines GIS", "Formularios", "Validación geoespacial"],
  },
  {
    area: "Automatización",
    summary: "Procesos repetibles con trazabilidad y menor carga manual.",
    points: ["Jenkins", "Argo Workflows", "Bitbucket", "Scripts Python"],
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("Todos");
  const filteredProjects =
    selectedProjectFilter === "Todos"
      ? projects
      : projects.filter((project) => project.categories.includes(selectedProjectFilter));

  useEffect(() => {
    if (!selectedImage && !selectedProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedProject]);

  const openLightbox = (image: LightboxImage) => {
    setSelectedImage(image);
  };

  const handleImageKeyDown = (
    event: ReactKeyboardEvent<HTMLImageElement>,
    image: LightboxImage,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  };

  return (
    <main className="portfolio-shell">
      <header className="topbar">
        <a
          className={`brand ${activeSection === "inicio" ? "brand-active" : ""}`}
          href="#inicio"
          aria-label="Ir al inicio"
          onClick={() => setActiveSection("inicio")}
        >
          SG
        </a>
        <nav className="nav-links" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "nav-link-active" : ""}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => setActiveSection(item.id)}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <section id="inicio" className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Portafolio 2026</p>
          <h1>Sebastian Garrido</h1>
          <p className="role">
            Ingeniero civil en informática y telecomunicaciones, desarrollador
            de software, data engineer y cloud.
          </p>
          <p className="intro">
            Construyo soluciones web y móviles con foco en interfaces claras,
            datos útiles y productos que se puedan mantener con criterio.
          </p>
          <div className="hero-actions" aria-label="Links principales">
            {links.map((link) => (
              <a
                key={link.label}
                className={link.label === "CV" ? "button button-primary" : "button"}
                href={link.href}
                target={link.label === "CV" ? undefined : "_blank"}
                rel={link.label === "CV" ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Vista previa del proyecto destacado">
          <div className="visual-header">
            <span>Proyecto destacado</span>
            <strong>Calendario móvil</strong>
          </div>
          <div className="device-grid">
            {featuredImages.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${image.alt} en grande`}
                onClick={() => openLightbox(image)}
                onKeyDown={(event) => handleImageKeyDown(event, image)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="snapshot section" aria-label="Resumen profesional">
        <div>
          <strong>{experiences.length}</strong>
          <span>experiencias laborales</span>
        </div>
        <div>
          <strong>{projects.length}</strong>
          <span>proyectos destacados</span>
        </div>
        <div>
          <strong>{skills.length}</strong>
          <span>tecnologías visibles</span>
        </div>
      </section>

      <section id="experiencia" className="section split-section">
        <div className="section-heading">
          <p className="eyebrow">Trayectoria</p>
          <h2>Experiencia</h2>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.period}`}>
              <p className="period">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="company">{item.company}</p>
              <p>{item.description}</p>
              <div className="experience-tech-row" aria-label={`Tecnologías usadas en ${item.company}`}>
                {item.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="proyectos" className="section">
        <div className="section-heading project-heading">
          <p className="eyebrow">Trabajo seleccionado</p>
          <h2>Proyectos</h2>
        </div>
        <div className="project-filter-bar" aria-label="Filtrar proyectos">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={selectedProjectFilter === filter ? "filter-active" : ""}
              onClick={() => setSelectedProjectFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="projects-list">
          {filteredProjects.map((project) => (
            <article
              className="project-card"
              key={project.title}
              role="button"
              tabIndex={0}
              aria-label={`Ver proyecto ${project.title}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedProject(project);
                }
              }}
            >
              <div className="project-copy">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="impact-list">
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tag-row" aria-label={`Tecnologías de ${project.title}`}>
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <button
                    className="project-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    Ver proyecto
                  </button>
                  {project.video ? (
                    <a
                      className="text-link"
                      href={project.video}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Ver demo
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="project-media">
                {project.images.map((image) => {
                  const lightboxImage = {
                    src: image,
                    alt: `Vista de ${project.title}`,
                    title: project.title,
                  };

                  return (
                    <img
                      key={image}
                      src={image}
                      alt={lightboxImage.alt}
                      loading="lazy"
                      role="button"
                      tabIndex={0}
                      aria-label={`Ver imagen de ${project.title} en grande`}
                      onClick={(event) => {
                        event.stopPropagation();
                        openLightbox(lightboxImage);
                      }}
                      onKeyDown={(event) => {
                        event.stopPropagation();
                        handleImageKeyDown(event, lightboxImage);
                      }}
                    />
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="monitor" className="section monitor-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Laboratorio</p>
          <h2>Un monitor visual para futuras métricas reales.</h2>
        </div>
        <div className="monitor-layout">
          <div className="monitor-panel">
            <div className="monitor-panel-header">
              <span>Pipeline Control</span>
              <strong>Portfolio Lab</strong>
            </div>
            <div className="monitor-stats">
              {monitorStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  <small>{stat.detail}</small>
                </div>
              ))}
            </div>
            <div className="monitor-table" aria-label="Estado de pipelines">
              {monitorRows.map((row) => (
                <div className="monitor-row" key={row.name}>
                  <div>
                    <strong>{row.name}</strong>
                    <span>{row.status}</span>
                  </div>
                  <div className="progress-track" aria-label={`${row.progress}% avanzado`}>
                    <span style={{ width: `${row.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="ideas-panel" aria-label="Ideas de proyectos personales">
            <p className="eyebrow">Próximos builds</p>
            {personalProjectIdeas.map((idea) => (
              <article key={idea.title}>
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
                <div className="mini-tag-row">
                  {idea.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section id="capacidades" className="section capabilities-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Mapa de capacidades</p>
          <h2>Áreas donde conecto producto, datos y operación.</h2>
        </div>
        <div className="capabilities-grid">
          {capabilityMap.map((capability) => (
            <article className="capability-card" key={capability.area}>
              <div>
                <span>{capability.area}</span>
                <p>{capability.summary}</p>
              </div>
              <ul>
                {capability.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section-heading">
          <p className="eyebrow">Stack</p>
          <h2>Tecnologías</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.name}>
              {skill.image ? (
                <img src={skill.image} alt="" aria-hidden="true" />
              ) : (
                <span className="skill-fallback" aria-hidden="true">
                  {skill.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="section contact-section">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2>Hablemos de software, datos o productos digitales.</h2>
        </div>
        <div className="contact-actions">
          <a className="button button-primary" href="https://www.linkedin.com/in/seba-garrido" target="_blank" rel="noreferrer">
            Escribirme en LinkedIn
          </a>
          <a className="button" href="https://github.com/seba-garrido" target="_blank" rel="noreferrer">
            Ver GitHub
          </a>
        </div>
      </section>

      {selectedProject ? (
        <div
          className="image-lightbox case-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Caso de estudio de ${selectedProject.title}`}
          onClick={() => setSelectedProject(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Cerrar caso"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedProject(null);
            }}
          >
            X
          </button>
          <article
            className="case-study-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="case-study-header">
              <p className="project-subtitle">{selectedProject.subtitle}</p>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </div>
            <section className="case-study-block">
              <div className="case-section-heading">
                <span>Resumen técnico</span>
                <h3>Qué problema resuelve y cómo está pensado.</h3>
              </div>
              <div className="case-study-grid">
                <section>
                  <span>Problema</span>
                  <p>{selectedProject.caseStudy.problem}</p>
                </section>
                <section>
                  <span>Enfoque</span>
                  <p>{selectedProject.caseStudy.approach}</p>
                </section>
                <section>
                  <span>Resultado</span>
                  <p>{selectedProject.caseStudy.result}</p>
                </section>
                <section>
                  <span>Siguiente</span>
                  <p>{selectedProject.caseStudy.nextSteps}</p>
                </section>
              </div>
            </section>
            <section className="case-study-block">
              <div className="case-section-heading">
                <span>Arquitectura</span>
                <h3>Flujo conceptual del proyecto.</h3>
              </div>
              <div className="case-flow">
                {selectedProject.caseStudy.flow.map((step, index) => (
                  <div className="flow-node" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </section>
            <section className="case-study-block">
              <div className="case-section-heading">
                <span>Tecnologías</span>
                <h3>Stack y foco del trabajo.</h3>
              </div>
              <div className="case-tech-layout">
                <div className="tag-row" aria-label={`Tecnologías de ${selectedProject.title}`}>
                  {selectedProject.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="mini-tag-row" aria-label={`Categorías de ${selectedProject.title}`}>
                  {selectedProject.categories.map((category) => (
                    <span key={category}>{category}</span>
                  ))}
                </div>
              </div>
            </section>
          </article>
        </div>
      ) : null}

      {selectedImage ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${selectedImage.title}`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            aria-label="Cerrar imagen"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(null);
            }}
          >
            X
          </button>
          <figure
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <figcaption>{selectedImage.title}</figcaption>
          </figure>
        </div>
      ) : null}
    </main>
  );
}

export default App;
