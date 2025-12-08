#!/usr/bin/env bash

# Meta-Prompting Framework - Claude Code Plugin Installer
# Installs skills, agents, commands, and workflows to Claude Code

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Plugin metadata
PLUGIN_NAME="meta-prompting-framework"
PLUGIN_VERSION="1.0.0"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Meta-Prompting Framework Plugin Installer${NC}"
echo -e "${BLUE}  Version: ${PLUGIN_VERSION}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo

# Determine installation location
if [ -n "$1" ]; then
    INSTALL_DIR="$1/.claude"
    echo -e "${YELLOW}Installing to project directory: $1${NC}"
else
    INSTALL_DIR="$HOME/.claude"
    echo -e "${YELLOW}Installing to global directory: $HOME/.claude${NC}"
fi

echo

# Confirm installation
read -p "Continue with installation? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Installation cancelled.${NC}"
    exit 1
fi

echo

# Create directories if they don't exist
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p "$INSTALL_DIR/skills"
mkdir -p "$INSTALL_DIR/agents"
mkdir -p "$INSTALL_DIR/commands"
mkdir -p "$INSTALL_DIR/workflows"
echo -e "${GREEN}✓${NC} Directories created"

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install skills
echo
echo -e "${BLUE}Installing skills...${NC}"
SKILLS_INSTALLED=0
if [ -d "$SCRIPT_DIR/skills" ]; then
    for skill_dir in "$SCRIPT_DIR/skills"/*; do
        if [ -d "$skill_dir" ]; then
            skill_name=$(basename "$skill_dir")
            # Skip non-skill files
            if [[ "$skill_name" == *.md ]]; then
                continue
            fi

            echo -e "  ${YELLOW}→${NC} Installing skill: ${skill_name}"
            cp -r "$skill_dir" "$INSTALL_DIR/skills/"
            ((SKILLS_INSTALLED++))
        fi
    done
fi
echo -e "${GREEN}✓${NC} Installed ${SKILLS_INSTALLED} skills"

# Install agents
echo
echo -e "${BLUE}Installing agents...${NC}"
AGENTS_INSTALLED=0
if [ -d "$SCRIPT_DIR/agents" ]; then
    for agent_file in "$SCRIPT_DIR/agents"/*.md; do
        if [ -f "$agent_file" ]; then
            agent_name=$(basename "$agent_file")
            # Skip README
            if [[ "$agent_name" == "README.md" ]]; then
                continue
            fi

            echo -e "  ${YELLOW}→${NC} Installing agent: ${agent_name}"
            cp "$agent_file" "$INSTALL_DIR/agents/"
            ((AGENTS_INSTALLED++))
        fi
    done

    # Copy agent directories (like meta2/)
    for agent_dir in "$SCRIPT_DIR/agents"/*; do
        if [ -d "$agent_dir" ]; then
            agent_name=$(basename "$agent_dir")
            echo -e "  ${YELLOW}→${NC} Installing agent: ${agent_name}"
            cp -r "$agent_dir" "$INSTALL_DIR/agents/"
            ((AGENTS_INSTALLED++))
        fi
    done
fi
echo -e "${GREEN}✓${NC} Installed ${AGENTS_INSTALLED} agents"

# Install commands
echo
echo -e "${BLUE}Installing commands...${NC}"
COMMANDS_INSTALLED=0
if [ -d "$SCRIPT_DIR/commands" ]; then
    for command_file in "$SCRIPT_DIR/commands"/*.md; do
        if [ -f "$command_file" ]; then
            command_name=$(basename "$command_file")
            # Skip README
            if [[ "$command_name" == "README.md" ]]; then
                continue
            fi

            echo -e "  ${YELLOW}→${NC} Installing command: ${command_name}"
            cp "$command_file" "$INSTALL_DIR/commands/"
            ((COMMANDS_INSTALLED++))
        fi
    done
fi
echo -e "${GREEN}✓${NC} Installed ${COMMANDS_INSTALLED} commands"

# Install workflows
echo
echo -e "${BLUE}Installing workflows...${NC}"
WORKFLOWS_INSTALLED=0
if [ -d "$SCRIPT_DIR/workflows" ]; then
    for workflow_file in "$SCRIPT_DIR/workflows"/*.yaml; do
        if [ -f "$workflow_file" ]; then
            workflow_name=$(basename "$workflow_file")
            # Skip README
            if [[ "$workflow_name" == "README.md" ]]; then
                continue
            fi

            echo -e "  ${YELLOW}→${NC} Installing workflow: ${workflow_name}"
            cp "$workflow_file" "$INSTALL_DIR/workflows/"
            ((WORKFLOWS_INSTALLED++))
        fi
    done
fi
echo -e "${GREEN}✓${NC} Installed ${WORKFLOWS_INSTALLED} workflows"

# Install Python dependencies
echo
echo -e "${BLUE}Installing Python dependencies...${NC}"
if [ -f "$SCRIPT_DIR/requirements.txt" ]; then
    if command -v pip3 &> /dev/null; then
        pip3 install -r "$SCRIPT_DIR/requirements.txt" --quiet
        echo -e "${GREEN}✓${NC} Python dependencies installed"
    else
        echo -e "${YELLOW}⚠${NC} pip3 not found. Please install Python dependencies manually:"
        echo -e "    pip3 install -r requirements.txt"
    fi
else
    echo -e "${YELLOW}⚠${NC} No requirements.txt found"
fi

# Install Python engine
echo
echo -e "${BLUE}Installing meta-prompting engine...${NC}"
if [ -d "$SCRIPT_DIR/meta_prompting_engine" ]; then
    ENGINE_DIR="$INSTALL_DIR/python-packages/meta_prompting_engine"
    mkdir -p "$ENGINE_DIR"
    cp -r "$SCRIPT_DIR/meta_prompting_engine"/* "$ENGINE_DIR/"
    echo -e "${GREEN}✓${NC} Meta-prompting engine installed"
else
    echo -e "${YELLOW}⚠${NC} No meta_prompting_engine directory found"
fi

# Copy plugin.json
echo
echo -e "${BLUE}Installing plugin metadata...${NC}"
if [ -f "$SCRIPT_DIR/plugin.json" ]; then
    cp "$SCRIPT_DIR/plugin.json" "$INSTALL_DIR/plugins/meta-prompting-framework.json"
    echo -e "${GREEN}✓${NC} Plugin metadata installed"
fi

# Summary
echo
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Installation Complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo
echo -e "${GREEN}Installed:${NC}"
echo -e "  • ${SKILLS_INSTALLED} skills"
echo -e "  • ${AGENTS_INSTALLED} agents"
echo -e "  • ${COMMANDS_INSTALLED} commands"
echo -e "  • ${WORKFLOWS_INSTALLED} workflows"
echo
echo -e "${YELLOW}Installation Location:${NC} ${INSTALL_DIR}"
echo
echo -e "${BLUE}Next Steps:${NC}"
echo -e "  1. Configure your Anthropic API key:"
echo -e "     ${YELLOW}export ANTHROPIC_API_KEY=sk-ant-your-key-here${NC}"
echo
echo -e "  2. Try a command:"
echo -e "     ${YELLOW}/grok${NC} or ${YELLOW}/meta-command${NC}"
echo
echo -e "  3. Use a skill:"
echo -e "     ${YELLOW}Skill: \"meta-prompt-iterate\"${NC}"
echo
echo -e "  4. Launch an agent:"
echo -e "     ${YELLOW}Task: subagent_type=\"meta2\"${NC}"
echo
echo -e "${GREEN}Happy meta-prompting!${NC}"
echo
