#!/usr/bin/env bash

# Meta-Prompting Framework - Claude Code Plugin Uninstaller

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Plugin metadata
PLUGIN_NAME="meta-prompting-framework"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Meta-Prompting Framework Plugin Uninstaller${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo

# Determine uninstallation location
if [ -n "$1" ]; then
    INSTALL_DIR="$1/.claude"
    echo -e "${YELLOW}Uninstalling from project directory: $1${NC}"
else
    INSTALL_DIR="$HOME/.claude"
    echo -e "${YELLOW}Uninstalling from global directory: $HOME/.claude${NC}"
fi

echo

# Confirm uninstallation
echo -e "${RED}WARNING: This will remove all meta-prompting framework resources.${NC}"
read -p "Continue with uninstallation? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Uninstallation cancelled.${NC}"
    exit 1
fi

echo

# Remove skills
echo -e "${BLUE}Removing skills...${NC}"
SKILLS_REMOVED=0
SKILLS_TO_REMOVE=(
    "meta-prompt-iterate"
    "analyze-complexity"
    "extract-context"
    "assess-quality"
    "category-master"
    "discopy-categorical-computing"
    "nexus-tui-generator"
)

for skill in "${SKILLS_TO_REMOVE[@]}"; do
    if [ -d "$INSTALL_DIR/skills/$skill" ]; then
        echo -e "  ${YELLOW}✗${NC} Removing skill: ${skill}"
        rm -rf "$INSTALL_DIR/skills/$skill"
        ((SKILLS_REMOVED++))
    fi
done
echo -e "${GREEN}✓${NC} Removed ${SKILLS_REMOVED} skills"

# Remove agents
echo
echo -e "${BLUE}Removing agents...${NC}"
AGENTS_REMOVED=0
AGENTS_TO_REMOVE=(
    "MARS.md"
    "MERCURIO.md"
    "mercurio-orchestrator.md"
    "meta2"
)

for agent in "${AGENTS_TO_REMOVE[@]}"; do
    if [ -e "$INSTALL_DIR/agents/$agent" ]; then
        echo -e "  ${YELLOW}✗${NC} Removing agent: ${agent}"
        rm -rf "$INSTALL_DIR/agents/$agent"
        ((AGENTS_REMOVED++))
    fi
done
echo -e "${GREEN}✓${NC} Removed ${AGENTS_REMOVED} agents"

# Remove commands
echo
echo -e "${BLUE}Removing commands...${NC}"
COMMANDS_REMOVED=0
COMMANDS_TO_REMOVE=(
    "grok.md"
    "meta-command.md"
    "meta-agent.md"
)

for command in "${COMMANDS_TO_REMOVE[@]}"; do
    if [ -f "$INSTALL_DIR/commands/$command" ]; then
        echo -e "  ${YELLOW}✗${NC} Removing command: ${command}"
        rm -f "$INSTALL_DIR/commands/$command"
        ((COMMANDS_REMOVED++))
    fi
done
echo -e "${GREEN}✓${NC} Removed ${COMMANDS_REMOVED} commands"

# Remove workflows
echo
echo -e "${BLUE}Removing workflows...${NC}"
WORKFLOWS_REMOVED=0
WORKFLOWS_TO_REMOVE=(
    "meta-framework-generation.yaml"
    "quick-meta-prompt.yaml"
    "research-project-to-github.yaml"
    "research-spec-generation.yaml"
    "startup-execution-plan.yaml"
)

for workflow in "${WORKFLOWS_TO_REMOVE[@]}"; do
    if [ -f "$INSTALL_DIR/workflows/$workflow" ]; then
        echo -e "  ${YELLOW}✗${NC} Removing workflow: ${workflow}"
        rm -f "$INSTALL_DIR/workflows/$workflow"
        ((WORKFLOWS_REMOVED++))
    fi
done
echo -e "${GREEN}✓${NC} Removed ${WORKFLOWS_REMOVED} workflows"

# Remove Python engine
echo
echo -e "${BLUE}Removing meta-prompting engine...${NC}"
if [ -d "$INSTALL_DIR/python-packages/meta_prompting_engine" ]; then
    rm -rf "$INSTALL_DIR/python-packages/meta_prompting_engine"
    echo -e "${GREEN}✓${NC} Meta-prompting engine removed"
else
    echo -e "${YELLOW}⚠${NC} No meta-prompting engine found"
fi

# Remove plugin metadata
echo
echo -e "${BLUE}Removing plugin metadata...${NC}"
if [ -f "$INSTALL_DIR/plugins/meta-prompting-framework.json" ]; then
    rm -f "$INSTALL_DIR/plugins/meta-prompting-framework.json"
    echo -e "${GREEN}✓${NC} Plugin metadata removed"
fi

# Summary
echo
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Uninstallation Complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo
echo -e "${GREEN}Removed:${NC}"
echo -e "  • ${SKILLS_REMOVED} skills"
echo -e "  • ${AGENTS_REMOVED} agents"
echo -e "  • ${COMMANDS_REMOVED} commands"
echo -e "  • ${WORKFLOWS_REMOVED} workflows"
echo -e "  • Python engine"
echo
echo -e "${YELLOW}Note:${NC} Python dependencies (anthropic, python-dotenv) were not removed."
echo -e "Run ${YELLOW}pip3 uninstall anthropic python-dotenv${NC} to remove them manually."
echo
