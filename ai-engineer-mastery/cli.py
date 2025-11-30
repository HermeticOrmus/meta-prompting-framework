#!/usr/bin/env python3
"""
AI Engineer Mastery - Command Line Interface
"""
import typer
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.markdown import Markdown
from pathlib import Path
from typing import Optional
import json
from datetime import datetime

app = typer.Typer(
    name="ai-mastery",
    help="AI Engineer Mastery - Your path from Apprentice to Pioneer",
    add_completion=False
)

console = Console()

# =============================================================================
# Configuration
# =============================================================================

CONFIG_FILE = Path.home() / ".ai-mastery" / "config.json"
PROGRESS_FILE = Path.home() / ".ai-mastery" / "progress.json"

def load_config():
    """Load user configuration"""
    if CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            return json.load(f)
    return {
        "current_level": 1,
        "started_at": None,
        "completed_levels": [],
        "learning_style": "hands-on",
        "weekly_hours": 15
    }

def save_config(config):
    """Save user configuration"""
    CONFIG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2)

# =============================================================================
# Commands
# =============================================================================

@app.command()
def init(
    name: str = typer.Option(..., prompt="Your name"),
    level: int = typer.Option(1, prompt="Starting level (1-7)"),
    hours: int = typer.Option(15, prompt="Weekly hours available"),
    style: str = typer.Option("hands-on", prompt="Learning style (hands-on/visual/theoretical)")
):
    """
    Initialize your AI Engineer Mastery journey
    """
    config = {
        "name": name,
        "current_level": level,
        "started_at": datetime.now().isoformat(),
        "completed_levels": [],
        "learning_style": style,
        "weekly_hours": hours,
        "total_hours_logged": 0
    }
    save_config(config)

    console.print(Panel.fit(
        f"[bold green]Welcome to AI Engineer Mastery, {name}! 🚀[/bold green]\n\n"
        f"Starting Level: {level}\n"
        f"Weekly Commitment: {hours} hours\n"
        f"Learning Style: {style}\n\n"
        f"[dim]Your progress is tracked in: {CONFIG_FILE}[/dim]",
        title="Initialization Complete"
    ))

    console.print("\n[bold]Next steps:[/bold]")
    console.print("1. Set up your environment: [cyan]ai-mastery setup[/cyan]")
    console.print("2. Start your first level: [cyan]ai-mastery start-level[/cyan]")
    console.print("3. Get daily practice: [cyan]ai-mastery daily-practice[/cyan]")

@app.command()
def setup():
    """
    Set up development environment
    """
    console.print("[bold]Setting up AI Engineer Mastery environment...[/bold]\n")

    # Check Python version
    import sys
    if sys.version_info >= (3, 10):
        console.print("✅ Python 3.10+ detected")
    else:
        console.print("❌ Python 3.10+ required")
        return

    # Check .env file
    env_file = Path(".env")
    if env_file.exists():
        console.print("✅ .env file found")
    else:
        console.print("⚠️  .env file not found")
        console.print("   Copy .env.example to .env and add your API keys")

    # Check API keys
    from dotenv import load_dotenv
    import os
    load_dotenv()

    if os.getenv("ANTHROPIC_API_KEY"):
        console.print("✅ Anthropic API key configured")
    else:
        console.print("⚠️  Anthropic API key not set")

    if os.getenv("OPENAI_API_KEY"):
        console.print("✅ OpenAI API key configured")
    else:
        console.print("⚠️  OpenAI API key not set")

    console.print("\n[bold green]Setup complete![/bold green]")
    console.print("Run: [cyan]ai-mastery start-level 1[/cyan] to begin")

@app.command()
def start_level(level: int):
    """
    Start a new mastery level
    """
    config = load_config()

    # Validate level
    if level < 1 or level > 7:
        console.print("[bold red]Level must be between 1 and 7[/bold red]")
        return

    # Check prerequisites
    if level > 1 and (level - 1) not in config.get("completed_levels", []):
        console.print(f"[bold yellow]Warning:[/bold yellow] Level {level - 1} not completed yet")
        confirm = typer.confirm("Continue anyway?")
        if not confirm:
            return

    levels = {
        1: {"name": "Foundation Builder", "emoji": "🏗️", "focus": "APIs, tokens, evaluation"},
        2: {"name": "Prompt Craftsman", "emoji": "✍️", "focus": "CoT, ToT, meta-prompting"},
        3: {"name": "Agent Conductor", "emoji": "🎭", "focus": "Multi-agent, LangGraph, MCP"},
        4: {"name": "Knowledge Alchemist", "emoji": "📚", "focus": "GraphRAG, knowledge graphs"},
        5: {"name": "Reasoning Engineer", "emoji": "🧮", "focus": "Fine-tuning, test-time compute"},
        6: {"name": "Systems Orchestrator", "emoji": "⚙️", "focus": "LLMOps, production, uptime"},
        7: {"name": "Architect of Intelligence", "emoji": "🏛️", "focus": "Meta-learning, categorical"}
    }

    level_info = levels[level]

    console.print(Panel.fit(
        f"[bold]{level_info['emoji']} Level {level}: {level_info['name']}[/bold]\n\n"
        f"Focus: {level_info['focus']}\n"
        f"Duration: 2-6 weeks\n\n"
        f"[dim]Starting level {level}...[/dim]",
        title=f"Level {level}"
    ))

    # Update config
    config["current_level"] = level
    config[f"level_{level}_started"] = datetime.now().isoformat()
    save_config(config)

    console.print("\n[bold]Your first tasks:[/bold]")
    console.print(f"1. Read: [cyan]./levels/0{level}-*/README.md[/cyan]")
    console.print(f"2. Set up: [cyan]pip install -r requirements-level-{level}.txt[/cyan]")
    console.print(f"3. Practice: [cyan]ai-mastery daily-practice[/cyan]")

@app.command()
def daily_practice():
    """
    Get today's practice tasks
    """
    config = load_config()
    level = config.get("current_level", 1)

    console.print(f"\n[bold]Daily Practice - Level {level}[/bold]\n")

    # Example tasks (would be loaded from curriculum)
    tasks = [
        {"duration": "30m", "task": "Review: Yesterday's code", "done": False},
        {"duration": "1h", "task": "Tutorial: State management patterns", "done": False},
        {"duration": "1h", "task": "Build: Add error handling to agent", "done": False},
        {"duration": "30m", "task": "Document: Learning notes", "done": False}
    ]

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Duration", style="dim", width=8)
    table.add_column("Task", min_width=40)
    table.add_column("Status", justify="center")

    for task in tasks:
        status = "✅" if task["done"] else "⬜"
        table.add_row(task["duration"], task["task"], status)

    console.print(table)

    console.print("\n[bold]Total time:[/bold] ~3 hours")
    console.print("[bold]Goal:[/bold] Complete all tasks today")
    console.print("\n[dim]Mark tasks complete: ai-mastery track-progress[/dim]")

@app.command()
def track_progress():
    """
    View your learning progress
    """
    config = load_config()

    console.print("\n[bold]Your Progress[/bold]\n")

    # Overall stats
    completed = len(config.get("completed_levels", []))
    current = config.get("current_level", 1)
    hours = config.get("total_hours_logged", 0)

    stats_table = Table(show_header=False, box=None)
    stats_table.add_column("Metric", style="bold")
    stats_table.add_column("Value", style="cyan")

    stats_table.add_row("Current Level", f"{current} / 7")
    stats_table.add_row("Levels Completed", str(completed))
    stats_table.add_row("Total Hours", f"{hours}h")
    stats_table.add_row("Days Active", "TBD")  # Calculate from start date

    console.print(stats_table)

    # Level progress
    console.print("\n[bold]Level Progress:[/bold]")
    progress_bar = "█" * completed + "░" * (7 - completed)
    console.print(f"[{progress_bar}] {completed}/7")

    console.print("\n[dim]Detailed progress: ai-mastery report[/dim]")

@app.command()
def status():
    """
    Show current status and next steps
    """
    config = load_config()

    if not config.get("started_at"):
        console.print("[yellow]Not initialized yet. Run:[/yellow] [cyan]ai-mastery init[/cyan]")
        return

    name = config.get("name", "Learner")
    level = config.get("current_level", 1)

    console.print(Panel.fit(
        f"[bold]Welcome back, {name}! 👋[/bold]\n\n"
        f"Current Level: {level}\n"
        f"Next: Complete today's practice\n\n"
        f"[dim]Run 'ai-mastery daily-practice' to continue[/dim]",
        title="AI Engineer Mastery"
    ))

@app.command()
def assess():
    """
    Take level assessment
    """
    console.print("[bold]Level Assessment[/bold]\n")
    console.print("This will evaluate your current AI engineering proficiency.")
    console.print("\n[dim]Assessment implementation coming soon...[/dim]")
    console.print("\nFor now, manually estimate your level:")
    console.print("1 = Can call LLM APIs")
    console.print("2 = Can write advanced prompts")
    console.print("3 = Can build multi-agent systems")
    console.print("etc.")

if __name__ == "__main__":
    app()
