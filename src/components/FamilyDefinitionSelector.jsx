import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const definitions = [
  { val: "EMP", label: "EMP" },
  { val: "ESC", label: "ESC" },
  { val: "ESCP/I", label: "ESCP/I" },
  { val: "Specify", label: "Specify" }
];

export default function FamilyDefinitionSelector({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(e, newDef) => newDef && onChange(newDef)}
      aria-label="family definition"
      size="small"
      sx={{
        mt: 1.3, mb: 1.6,
        "& .MuiToggleButton-root": {
          borderRadius: 50,
          minWidth: 90,
          mx: 0.9,
          mt: 0.3,
          mb: 0,
          bgcolor: "#f3f3f3",
          color: "#292929",
          fontWeight: 700,
          fontSize: 15.2,
          px: 2.1,
          py: 1.2,
          border: "none",
          boxShadow: "none",
          textTransform: "none",
          "&.Mui-selected": {
            bgcolor: "#12c451",
            color: "#fff",
            border: "none",
            boxShadow: "0 3px 14px #74fea120"
          }
        }
      }}
    >
      {definitions.map(def =>
        <ToggleButton key={def.val} value={def.val}>{def.label}</ToggleButton>
      )}
    </ToggleButtonGroup>
  );
}
