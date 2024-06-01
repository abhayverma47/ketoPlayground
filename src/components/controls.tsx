import React from "react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const sections = ["Section1", "Section2", "Section3"] as const;

const plants = {
  Section1: ["Plant1", "Plant2", "Plant3", "Plant4"],

  Section2: ["Plant5", "Plant6", "Plant7", "Plant8"],

  Section3: ["Plant9", "Plant10", "Plant11", "Plant12"],
} as const;

const areas = [
  {
    plant1: ["Area1", "Area2", "Area3", "Area4"],
  },
  {
    plant2: ["Area5", "Area6", "Area7", "Area8"],
  },
  {
    plant3: ["Area9", "Area10", "Area11", "Area12"],
  },
  {
    plant4: ["Area13", "Area14", "Area15", "Area16"],
  },
  {
    plant5: ["Area17", "Area18", "Area19", "Area20"],
  },
  {
    plant6: ["Area21", "Area22", "Area23", "Area24"],
  },
  {
    plant7: ["Area25", "Area26", "Area27", "Area28"],
  },
  {
    plant8: ["Area29", "Area30", "Area31", "Area32"],
  },
  {
    plant9: ["Area33", "Area34", "Area35", "Area36"],
  },
  {
    plant10: ["Area37", "Area38", "Area39", "Area40"],
  },
  {
    plant11: ["Area41", "Area42", "Area43", "Area44"],
  },
  {
    plant12: ["Area45", "Area46", "Area47", "Area48"],
  },
];

const Controls = () => {
  const [selectedSections, setSelectedSections] = React.useState<
    (typeof sections)[number][]
  >(["Section1"]);
  const [selectedPlants, setSelectedPlants] = React.useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3>Sections</h3>
        <ToggleGroup
          className="flex items-center justify-start"
          type="multiple"
          variant="outline"
        >
          {sections.map((section) => (
            <ToggleGroupItem
              key={section}
              value={section}
              aria-label="Toggle bold"
            >
              <h4>{section}</h4>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Plants</h3>
        {selectedSections ? (
          <ToggleGroup
            className="flex items-center justify-start"
            type="multiple"
            variant="outline"
          >
            {selectedSections[0] &&
              plants[selectedSections[0]]?.map((section) => (
                <ToggleGroupItem
                  key={section}
                  value={section}
                  aria-label="Toggle bold"
                >
                  <h4>{section}</h4>
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
        ) : (
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-1/6" />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3>Areas</h3>
        <ToggleGroup
          className="flex items-center justify-start"
          type="multiple"
          variant="outline"
        >
          {sections.map((section) => (
            <ToggleGroupItem
              key={section}
              value={section}
              aria-label="Toggle bold"
            >
              <h4>{section}</h4>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Button className="w-1/2 self-end">Submit</Button>
    </section>
  );
};

export default Controls;
