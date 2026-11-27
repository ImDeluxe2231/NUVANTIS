import { Icon, type IconName } from "./ui";

const shapes = ["stack", "rings", "bars", "cubes", "stack", "cube"] as const;

export function ReferenceArt({ index, icon }: { index: number; icon: IconName }) {
  const shape = shapes[index % shapes.length];
  return <div aria-hidden="true" className={`reference-art reference-art--${shape}`}>
    <span/><span/><span/>
    <div className="reference-art-glyph"><Icon name={icon} size={34}/></div>
  </div>;
}
