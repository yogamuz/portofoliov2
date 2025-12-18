import { useState, useEffect, useRef } from "react";
import {
  FaVuejs,
  FaNodeJs,
  FaGithub,
  FaReact,
  FaLaravel,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiPostman,
  SiClaude,
  SiMysql,
  SiPostgresql,
  SiGit
} from "react-icons/si";
import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Function untuk membuat nodes skills
function createSkillsNodes(skills, isVisible) {
  return skills.map((skill, index) => ({
    id: `skill-${index}`,
    type: "default",
    position: { x: -500, y: 30 + index * 140 }, // ← ubah dari y: 50 + index * 100 ke y: 30 + index * 120
    data: {
      label: (
        <div
          className={`flex flex-col items-center gap-1 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${index * 150}ms`, pointerEvents: "auto" }}
        >
          <skill.icon
            className={`lg:text-8xl md:text-8xl sm:text-7xl text-gray-300 transition-colors duration-300 flex-shrink-0 ${
              skill.hoverColor || "hover:text-white"
            }`}
          />
          <span className="text-2xl text-gray-300 font-medium text-center whitespace-pre-line leading-tight">
            {skill.name}
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
    },
    sourcePosition: "right",
    targetPosition: "right",
  }));
}

// Function untuk membuat nodes tools
function createToolsNodes(tools, isVisible, skillsLength) {
  return tools.map((tool, index) => ({
    id: `tool-${index}`,
    type: "default",
    position: { x: 1250, y: 30 + index * 140 }, // ← ubah dari y: 50 + index * 100 ke y: 30 + index * 120
    data: {
      label: (
        <div
          className={`flex flex-col items-center gap-1 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: `${(skillsLength + index + 1) * 150}ms`,
            pointerEvents: "auto",
          }}
        >
          {tool.icon ? (
            <tool.icon
              className={`lg:text-8xl md:text-8xl sm:text-7xl text-gray-300 transition-colors duration-300 flex-shrink-0 ${
                tool.hoverColor || "hover:text-white"
              }`}
            />
          ) : (
            <img
              src={tool.iconUrl}
              alt={tool.name}
              className="w-16 h-16 flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
            />
          )}
          <span className="text-2xl text-gray-300 font-medium text-center whitespace-nowrap">
            {tool.name}
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
    },
    sourcePosition: "left",
    targetPosition: "left",
  }));
}

// Function untuk membuat center node
function createCenterNode(isVisible, skillsLength) {
  return {
    id: "tech-stack",
    type: "default",
    position: { x: 380, y: 30 + (skillsLength * 140) / 2 - 60 }, // Adjusted Y position untuk node lebih besar
    data: {
      label: (
        <div
          className={`flex items-center justify-center transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: `${skillsLength * 150}ms` }}
        >
          <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 font-bold px-8 py-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-white/30 whitespace-nowrap shadow-2xl">
            Skills
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
      width: 200,
      height: 120,
    },
    sourcePosition: "right",
    targetPosition: "left",
  };
}

// Function untuk membuat edges skills
function createSkillsEdges(skillsCount) {
  return Array.from({ length: skillsCount }, (_, index) => ({
    id: `e-skill-${index}`,
    source: `skill-${index}`,
    target: "tech-stack",
    animated: true,
    style: { stroke: "#8a7fff", strokeWidth:4 },
  }));
}

// Function untuk membuat edges tools
function createToolsEdges(toolsCount) {
  return Array.from({ length: toolsCount }, (_, index) => ({
    id: `e-tool-${index}`,
    source: "tech-stack",
    target: `tool-${index}`,
    animated: true,
    style: { stroke: "#8a7fff", strokeWidth: 4 },
  }));
}

// Function untuk membuat nodes mobile (vertical layout with center connections)
function createMobileSkillsNodes(skills, isVisible) {
  return skills.map((skill, index) => ({
    id: `mobile-skill-${index}`,
    type: "default",
    position: { x: 100, y: 20 + index * 65 },
    data: {
      label: (
        <div
          className={`flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <skill.icon
            className={`${
              skill.name === "Tailwind CSS" || skill.name === "MongoDB"
                ? "text-2xl"
                : "text-3xl"
            } text-gray-300 hover:text-white transition-colors duration-300 flex-shrink-0`}
          />
          <span
            className="text-gray-300 font-medium"
            style={{
              maxWidth: "90px",
              lineHeight: "1.2",
              whiteSpace: "pre-line",
            }}
          >
            {skill.mobileName || skill.name}
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
    },
    sourcePosition: "top",
    targetPosition: "top",
  }));
}

// Function untuk membuat center node mobile
function createMobileCenterNode(isVisible, skillsLength) {
  return {
    id: "mobile-stack",
    type: "default",
    position: { x: 120, y: 20 + skillsLength * 65 + 20 },
    data: {
      label: (
        <div
          className={`flex items-center justify-center transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transitionDelay: `${skillsLength * 100}ms` }}
        >
        <span className="text-sm text-transparent bg-clip-text bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600 font-bold px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border-2 border-white/30 whitespace-nowrap shadow-lg">
            Skills
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
    },
    sourcePosition: "bottom",
    targetPosition: "top",
  };
}

// Function untuk membuat nodes mobile tools (bottom)
function createMobileToolsNodes(tools, isVisible, skillsLength) {
  const centerNodeY = 20 + skillsLength * 65 + 20;
  return tools.map((tool, index) => ({
    id: `mobile-tool-${index}`,
    type: "default",
    position: { x: 100, y: centerNodeY + 80 + index * 65 },
    data: {
      label: (
        <div
          className={`flex items-center gap-3 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDelay: `${(skillsLength + index + 1) * 100}ms`,
          }}
        >
          {tool.icon ? (
            <tool.icon className="text-3xl text-gray-300 hover:text-white transition-colors duration-300 flex-shrink-0" />
          ) : (
            <img
              src={tool.iconUrl}
              alt={tool.name}
              className="w-8 h-8 flex-shrink-0 hover:opacity-80 transition-opacity duration-300"
            />
          )}
          <span className=" text-gray-300 font-medium whitespace-nowrap">
            {tool.name}
          </span>
        </div>
      ),
    },
    style: {
      background: "transparent",
      border: "none",
      padding: 0,
    },
    sourcePosition: "bottom",
    targetPosition: "bottom",
  }));
}

// Function untuk membuat edges mobile skills
function createMobileSkillsEdges(skillsCount) {
  return Array.from({ length: skillsCount }, (_, index) => ({
    id: `e-mobile-skill-${index}`,
    source: `mobile-skill-${index}`,
    target: "mobile-stack",
    animated: true,
    style: { stroke: "#8a7fff", strokeWidth: 2 },
    type: "smoothstep",
  }));
}

// Function untuk membuat edges mobile tools
function createMobileToolsEdges(toolsCount) {
  return Array.from({ length: toolsCount }, (_, index) => ({
    id: `e-mobile-tool-${index}`,
    source: "mobile-stack",
    target: `mobile-tool-${index}`,
    animated: true,
    style: { stroke: "#8a7fff", strokeWidth: 2 },
    type: "smoothstep",
  }));
}
export default function Skills({ showHeader = true, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let hasTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      if (!hasTriggered && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          hasTriggered = true;
          setIsVisible(true);
        }
      }
    }, 500);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  const skills = [
    { icon: FaVuejs, name: "Vue.js", hoverColor: "hover:text-[#42b883]" },
    { icon: FaReact, name: "React", hoverColor: "hover:text-[#61dafb]" },
    { icon: FaNodeJs, name: "Node.js", hoverColor: "hover:text-[#68a063]" },
    {
      icon: SiTailwindcss,
      name: "Tailwind CSS",
      mobileName: "Tailwind\nCSS",
      hoverColor: "hover:text-[#06b6d4]",
    },
    { icon: FaLaravel, name: "Laravel", hoverColor: "hover:text-[#ff2d20]" },
    { icon: SiMongodb, name: "MongoDB", hoverColor: "hover:text-[#47a248]" },
    { icon: SiPostgresql, name: "PostgreSQL", mobileName: "PostgreSQL", hoverColor: "hover:text-[#4479a1]" },
  ];

  const tools = [
    { icon: FaGithub, name: "GitHub", hoverColor: "hover:text-[#24292E]" },
    { icon: SiGit, name: "Git", hoverColor: "hover:text-[#f05032]" },
    { icon: SiPostman, name: "Postman", hoverColor: "hover:text-[#ff6c37]" },
    { icon: SiClaude, name: "Claude", hoverColor: "hover:text-[#d97757]" },

    {
      iconUrl:
        "https://registry.npmmirror.com/@lobehub/icons-static-png/1.74.0/files/dark/openai.png",
      name: "ChatGPT",
    },
  ];

  const skillsNodes = createSkillsNodes(skills, isVisible);
  const centerNode = createCenterNode(isVisible, skills.length);
  const toolsNodes = createToolsNodes(tools, isVisible, skills.length);
  const nodes = [...skillsNodes, centerNode, ...toolsNodes];

  const skillsEdges = createSkillsEdges(skills.length);
  const toolsEdges = createToolsEdges(tools.length);
  const edges = [...skillsEdges, ...toolsEdges];

  const mobileSkillsNodes = createMobileSkillsNodes(skills, isVisible);
  const mobileCenterNode = createMobileCenterNode(isVisible, skills.length);
  const mobileToolsNodes = createMobileToolsNodes(
    tools,
    isVisible,
    skills.length
  );
  const mobileNodes = [
    ...mobileSkillsNodes,
    mobileCenterNode,
    ...mobileToolsNodes,
  ];

  const mobileSkillsEdges = createMobileSkillsEdges(skills.length);
  const mobileToolsEdges = createMobileToolsEdges(tools.length);
  const mobileEdges = [...mobileSkillsEdges, ...mobileToolsEdges];

  return (
    <div ref={sectionRef} className={`w-full flex flex-col ${className}`}>
      {/* Header Section - Conditional */}
      {showHeader && (
        <div className="w-full mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
          </h2>
        </div>
      )}

      {/* Content Section with ReactFlow Desktop */}
      <div
        className="hidden md:block w-full mx-auto"
        style={{ maxWidth: "1200px", height: "550px", pointerEvents: "none" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255, 255, 255, 0.05)" gap={16} />
        </ReactFlow>
      </div>

      {/* Mobile View - With ReactFlow */}
      <div
        className="md:hidden w-full mx-auto px-2"
        style={{ height: "750px" }}
      >
        <ReactFlow
          nodes={mobileNodes}
          edges={mobileEdges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255, 255, 255, 0.05)" gap={16} />
        </ReactFlow>
      </div>


    </div>
  );
}
