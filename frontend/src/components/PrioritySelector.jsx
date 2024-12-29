import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";

const PrioritySelector = ({ items, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleButtonClick = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Box display="flex" gap={4}>
      {items.map((item) => (
        <Button
          key={item.value}
          variant="surface"
          onClick={() => handleButtonClick(item.value)}
          colorPalette={selectedValue === item.value ? item.color : "gray"}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default PrioritySelector;
