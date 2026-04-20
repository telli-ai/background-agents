"use client";

import type { AvailableAgent } from "@open-inspect/shared";
import { Combobox } from "@/components/ui/combobox";
import { ChevronDownIcon } from "@/components/ui/icons";

interface AgentPickerProps {
  selectedAgent: string;
  onSelect: (agent: string) => void;
  availableAgents: AvailableAgent[];
  hasFetchedAgents: boolean;
  disabled?: boolean;
}

export function AgentPicker({
  selectedAgent,
  onSelect,
  availableAgents,
  hasFetchedAgents,
  disabled = false,
}: AgentPickerProps) {
  const items =
    availableAgents.length > 0
      ? availableAgents.map((agent) => ({
          value: agent.name,
          label: agent.name,
          description: agent.description ?? undefined,
        }))
      : [{ value: "build", label: "build", description: "Default agent" }];

  return (
    <Combobox
      value={selectedAgent}
      onChange={onSelect}
      items={items}
      prependContent={
        !hasFetchedAgents
          ? () => (
              <div className="border-b border-border-muted px-3 py-2 text-xs text-muted-foreground">
                Agents will be fetched after the sandbox is running.
              </div>
            )
          : undefined
      }
      searchable
      searchPlaceholder="Search agents..."
      filterFn={(option, query) =>
        option.label.toLowerCase().includes(query) ||
        (option.description?.toLowerCase().includes(query) ?? false) ||
        String(option.value).toLowerCase().includes(query)
      }
      direction="up"
      dropdownWidth="w-72"
      disabled={disabled}
      triggerClassName="flex items-center gap-2 self-start text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition sm:self-auto"
    >
      <span className="text-secondary-foreground">Agent</span>
      <span className="max-w-[10rem] truncate text-foreground">{selectedAgent}</span>
      <ChevronDownIcon className="h-3 w-3" />
    </Combobox>
  );
}
