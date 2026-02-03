import React from "react";
import { FaReact, FaJsSquare, FaNodeJs, FaLaravel } from "react-icons/fa";
import "./FloatingIcons.css";

const icons = [FaReact, FaJsSquare, FaNodeJs, FaLaravel];

const FloatingIcons = () => {
  return (
    <div className="floating-icons">
      {Array.from({ length: 15 }).map((_, i) => {
        const Icon = icons[Math.floor(Math.random() * icons.length)];
        const size = 20 + Math.random() * 40;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        return (
          <Icon
            key={i}
            className="floating-icon"
            style={{
              fontSize: `${size}px`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingIcons;
