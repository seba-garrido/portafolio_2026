import { useState } from "react";
import "./App.css";

type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

type Project = {
  title: string;
  subtitle: string;
  description: string;
  impact: string[];
  tech: string[];
  images: string[];
  video?: string;
};

type Skill = {
  name: string;
  image?: string;
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
  { id: "skills", label: "Stack" },
  { id: "contacto", label: "Contacto" },
];

const experiences: Experience[] = [
  {
    period: "Sep. 2025 - Presente",
    role: "Data Engineer & Cloud",
    company: "Scotiabank",
    description:
      "Desarrollo de workers para un proyecto de actualizacion de renta basado en OCR y LLM, normalizando datos, obteniendo cotizaciones y preparando informacion para integracion con Scotiaflow. Trabajo con Google Cloud Platform, Vertex AI, Cloud Run, Cloud SQL, Cloud Functions, MongoDB, Jenkins y Argo Workflows.",
  },
  {
    period: "Ene. 2025 - Ago. 2025",
    role: "Desarrollador de Software",
    company: "INNVATTI Group",
    description:
      "Desarrollo de un sistema WMS con foco en flujos de negocio, optimizacion de procedimientos almacenados en SQL Server, automatizacion de tareas administrativas con Python y mejora de consultas complejas para rendimiento del sistema.",
  },
  {
    period: "Ene. 2025 - Jun. 2025",
    role: "Ingeniero de Software",
    company: "Geodev Spa.",
    description:
      "Modelado de bases de datos relacionales para proyectos GIS, desarrollo de pipelines ETL geoespaciales, configuracion de jobs en Jenkins, formularios en ArcGIS conectados a bases de datos y automatizacion de procesos con Python y APIs.",
  },
  {
    period: "Aug. 2022 - Mar. 2023",
    role: "Desarrollador de Software",
    company: "Geodev Spa.",
    description:
      "Desarrollo de una aplicacion movil para monitoreo de maquinaria y personal, con programacion en Python, gestion de bases de datos MySQL y PostgreSQL, y trabajo colaborativo con equipos de UI/UX y aseguramiento de calidad.",
  },
  {
    period: "Jan. 2021 - Mar. 2021",
    role: "Practica Profesional I",
    company: "Ingenieria y Construccion Sigdo Koppers S.A.",
    description:
      "Desarrollo de una aplicacion web para visualizar KPIs en televisores de la empresa e integracion de dashboards de PowerBI en un carrusel web.",
  },
];

const projects: Project[] = [
  {
    title: "Calendario movil forestal",
    subtitle: "App movil para gestion operativa",
    description:
      "Proyecto construido para apoyar la planificacion de actividades en terreno, con una interfaz enfocada en seguimiento por fechas y consulta rapida.",
    impact: ["Vista tipo calendario", "Capturas reales del flujo", "Demo funcional en video"],
    tech: ["QML", "SQLite", "Python", "HTML", "CSS"],
    images: ["/images/calendario2.png", "/images/calendario1.png", "/images/calendario3.jpg"],
    video: "/videos/demo_calendario.mov",
  },
  {
    title: "Carrusel de dashboards",
    subtitle: "Visualizacion web para PowerBI",
    description:
      "Aplicacion web creada para exponer tableros de datos en formato carrusel, pensada para pantallas de monitoreo y lectura rapida.",
    impact: ["Rotacion de informacion", "Diseno para pantallas", "Proyecto de practica profesional"],
    tech: ["JavaScript", "HTML", "CSS", "PowerBI"],
    images: ["/images/arauco1.png", "/images/arauco2.png", "/images/arauco3.png"],
  },
  {
    title: "Sistema WMS",
    subtitle: "Gestion operativa para bodega",
    description:
      "Sistema Warehouse Management System desarrollado con foco en flujos de negocio, rendimiento de consultas y automatizacion de tareas administrativas para operaciones logisticas.",
    impact: [
      "Flujos WMS para procesos de negocio",
      "Procedimientos almacenados en SQL Server",
      "Automatizaciones con Python",
    ],
    tech: ["SQL Server", "Python", "REST APIs", "WMS", "Optimización SQL"],
    images: [
      "https://images.unsplash.com/photo-1749244768351-2726dc23d26c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1721937127582-ed331de95a04?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Pipeline ETL geoespacial",
    subtitle: "Datos GIS, automatizacion y despliegue",
    description:
      "Pipeline de datos para ingesta, transformacion y validacion de informacion geoespacial, integrando bases relacionales, scripts Python, jobs en Jenkins y formularios ArcGIS.",
    impact: [
      "Ingesta y transformacion de datos geoespaciales",
      "Jobs automatizados en Jenkins",
      "Validacion de calidad por etapa",
    ],
    tech: ["Python", "ArcGIS", "ETL", "SQL Server", "Jenkins", "Bash"],
    images: [
      "https://images.unsplash.com/photo-1698087908802-baae881e41e6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1687603921109-46401b201195?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Workers OCR y LLM",
    subtitle: "Automatizacion cloud para procesamiento documental",
    description:
      "Workers para un proyecto de actualizacion de renta basado en OCR y modelos de lenguaje, orientados a normalizar datos, obtener cotizaciones y preparar informacion para integracion con Scotiaflow.",
    impact: [
      "Normalizacion de datos desde documentos",
      "Procesamiento con OCR y LLMs",
      "Servicios cloud listos para integracion",
    ],
    tech: ["Python", "Google Cloud", "Vertex AI", "Cloud Run", "Cloud SQL", "MongoDB", "OCR", "LLMs"],
    images: [
      "https://images.unsplash.com/photo-1764231467852-b609a742e082?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1707157281599-d155d1da5b4c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    title: "Portafolio personal",
    subtitle: "Identidad profesional y proyectos",
    description:
      "Evolucion del portafolio original hacia una experiencia mas moderna, responsive y orientada a mostrar trabajo real con mejor jerarquia visual.",
    impact: ["Experiencia responsive", "Secciones claras", "Links profesionales"],
    tech: ["React", "TypeScript", "Vite", "CSS"],
    images: ["/images/react.svg", "/images/javascript.svg", "/images/css.svg"],
  },
];

const skills: Skill[] = [
  { name: "Python", image: "/images/python.svg" },
  { name: "SQL" },
  { name: "React", image: "/images/react.svg" },
  { name: "JavaScript", image: "/images/javascript.svg" },
  { name: "HTML5", image: "/images/html5.svg" },
  { name: "CSS", image: "/images/css.svg" },
  { name: "MySQL", image: "/images/mysql.svg" },
  { name: "PostgreSQL", image: "/images/postgresql.svg" },
  { name: "SQL Server" },
  { name: "MongoDB" },
  { name: "Google Cloud" },
  { name: "Vertex AI" },
  { name: "Cloud Run" },
  { name: "Cloud SQL" },
  { name: "Cloud Functions" },
  { name: "ETL" },
  { name: "OCR" },
  { name: "LLMs" },
  { name: "Bitbucket" },
  { name: "Jenkins" },
  { name: "Argo Workflows" },
  { name: "ArcGIS" },
  { name: "Power BI" },
  { name: "FastAPI" },
  { name: "Django", image: "/images/django.svg" },
  { name: "Pandas" },
  { name: "Machine Learning" },
  { name: "Java", image: "/images/java.svg" },
  { name: "QML", image: "/images/qml.svg" },
  { name: "SQLite", image: "/images/sqlite.svg" },
];

function App() {
  const [activeSection, setActiveSection] = useState("inicio");

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
        <nav className="nav-links" aria-label="Navegacion principal">
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
            Ingeniero civil en informatica y telecomunicaciones, desarrollador
            de software, data engineer y cloud.
          </p>
          <p className="intro">
            Construyo soluciones web y moviles con foco en interfaces claras,
            datos utiles y productos que se puedan mantener con criterio.
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
            <strong>Calendario movil</strong>
          </div>
          <div className="device-grid">
            <img src="/images/calendario2.png" alt="Captura de calendario movil" />
            <img src="/images/calendario1.png" alt="Captura de detalle calendario" />
            <img src="/images/calendario3.jpg" alt="Captura adicional del proyecto" />
          </div>
        </div>
      </section>

      <section className="snapshot section" aria-label="Resumen profesional">
        <div>
          <strong>{experiences.length}</strong>
          <span>experiencias reales</span>
        </div>
        <div>
          <strong>{projects.length}</strong>
          <span>proyectos destacados</span>
        </div>
        <div>
          <strong>{skills.length}</strong>
          <span>tecnologias visibles</span>
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
            </article>
          ))}
        </div>
      </section>

      <section id="proyectos" className="section">
        <div className="section-heading project-heading">
          <p className="eyebrow">Trabajo seleccionado</p>
          <h2>Proyectos</h2>
        </div>
        <div className="projects-list">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-copy">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="impact-list">
                  {project.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tag-row" aria-label={`Tecnologias de ${project.title}`}>
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {project.video ? (
                  <a className="text-link" href={project.video} target="_blank" rel="noreferrer">
                    Ver demo
                  </a>
                ) : null}
              </div>
              <div className="project-media">
                {project.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Vista de ${project.title}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section-heading">
          <p className="eyebrow">Stack</p>
          <h2>Tecnologias</h2>
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
    </main>
  );
}

export default App;
