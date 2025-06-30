import * as Icons from "lucide-react";

interface Props {
  iconName: keyof typeof Icons; // e.g. "BellUp", "Mail", etc.
  size?: number;
  color?: string;
}

function DynamicIcon({
  iconName,
  size = 24,
  color = "currentColor",
}: Props) {
  const IconComponent = Icons[iconName] as React.ElementType;
  if (!IconComponent) {
    // you could throw, warn, or return a default
    console.warn(`Icon "${iconName}" does not exist in lucide-react`);
    return null;
  }
  return <IconComponent size={size} color={color} />;
}

export default DynamicIcon;