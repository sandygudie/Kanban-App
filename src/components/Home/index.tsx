import React from "react";
import Icon from "components/Icon";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <div>
      <header className="flex items-center justify-between px-16 py-4">
        <Link to="/">
          <Icon type="kanban_logo" />
        </Link>
        <div className="flex items-center gap-x-6">
          <Link to="/">Features</Link>
          <Link to="/">Technologies</Link>
          <Link to="/">Contact</Link>
        </div>
        <button className="bg-primary rounded-lg text-white text-base px-6 py-2 font-bold">Get Started</button>
      </header>
    </div>
  );
}

// feature: Simplified view board view , task view  handle mutiple project(board)
// drop suggestion/ issues on github, draggable(drag abd drop)