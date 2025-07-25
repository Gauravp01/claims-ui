import React from "react";
import {
  Card, Box, Grid,
  IconButton,
  TextField, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
 
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from '@mui/icons-material/Close';
import FamilyDefinitionSelector from "./FamilyDefinitionSelector";

const SUM_INSURED_OPTIONS = [
  100000, 200000, 300000, 400000, 500000, 750000
];

const SumInsuredTypePill = ({ value, selected, onClick }) => (
  <Box
    sx={{
      display: "inline-block",
      px: 2.4, py: 0.6,
      bgcolor: selected ? "#296be5" : "#f4fafe",
      color: selected ? "#fff" : "#296be5",
      fontWeight: 700,
      borderRadius: 3.8,
      fontSize: 14,
      mx: 0.5,
      border: selected ? "2px solid #296be5" : "1.5px solid #e3eafc",
      cursor: "pointer",
      boxShadow: selected ? "0 1px 10px #7fb1fb20" : "none",
      transition: "all .18s"
    }}
    onClick={onClick}
  >{value}</Box>
);

export default function ClaimsOptionCard({
  data,
  index,
  onChange,
  onClone,
  onDelete,
  deletable
}) {
  const {
    label, familyDefinition,
    employees, dependents, totalLives,
    sumInsured, sumInsuredManual, comments,
    sumInsuredType = "Family Floater"
  } = data;

  // Helper for pills
  const SumTypeOptions = ["Family Floater", "Individual", "Specify"];

  // For consistent pill "checked" style
  const sumInsuredValue = SUM_INSURED_OPTIONS.includes(sumInsured) ? String(sumInsured) : "";

  return (
    <Card sx={{
      borderRadius: 3.5,
      boxShadow: '0 2px 10px #e3eafc',
      background: '#fff',
      minWidth: 355,
      maxWidth: 420,
      mx: 0,
      mt: 0,
      overflow: 'visible',
      border: '1.3px solid #e3eafc'
    }}>
      {/* Card header */}
      <Box sx={{
        bgcolor: "#296be5",
        color: "#fff",
        px: 2.4,
        py: 1.4,
        borderRadius: "14px 14px 0 0",
        fontWeight: 700,
        fontSize: 16.3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span>{label}</span>
        <Box display="flex" alignItems="center">
          <IconButton onClick={onClone} size="small" sx={{ color: "#f6f8ff" }}>
            <AddCircleOutlineIcon fontSize="medium" />
          </IconButton>
          {deletable && (
            <IconButton onClick={onDelete} size="small" sx={{ color: "#fff", ml: 1.1 }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box sx={{ px: 2.8, pb: 2.5, pt: 2 }}>
        {/* Family Definition */}
        <Box sx={{
          fontWeight: 800,
          fontSize: 13.3,
          bgcolor: '#eaf4ff',
          color: '#296be5',
          px: 1.5, py: "2px", borderRadius: 2.5,
          letterSpacing: 1.1, mb: 0.6, display: "inline-block"
        }}>
          Family Definition
        </Box>
        <FamilyDefinitionSelector
          value={familyDefinition}
          onChange={fd => onChange({ ...data, familyDefinition: fd })}
        />

        {/* Breakup of Lives */}
        <Box sx={{
          fontWeight: 800,
          fontSize: 13.3,
          bgcolor: '#eaf4ff',
          color: '#296be5',
          px: 1.5, py: "2px", borderRadius: 2,
          letterSpacing: 1.1, mb: 1.2, mt: 1.3,
          display: "inline-block"
        }}>
          Breakup of Lives
        </Box>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 0.7 }}>
          <Grid item xs={4.1}>
            <TextField
              label="No. of Employees"
              size="small"
              variant="outlined"
              type="number"
              value={employees}
              onChange={e => onChange({ ...data, employees: Number(e.target.value) })}
              inputProps={{ min: 0, style: { fontSize: 15.3, fontWeight: 600 } }}
              fullWidth
              sx={{
                bgcolor: "#f4fafe",
                borderRadius: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 2.5 }
              }}
            />
          </Grid>
          <Grid item xs={4.1}>
            <TextField
              label="No. of Dependents"
              size="small"
              variant="outlined"
              type="number"
              value={dependents}
              onChange={e => onChange({ ...data, dependents: Number(e.target.value) })}
              fullWidth
              sx={{
                bgcolor: "#f4fafe",
                borderRadius: 2.5,
                '& .MuiOutlinedInput-root': { borderRadius: 2.5 }
              }}
              inputProps={{ min: 0, style: { fontSize: 15.3, fontWeight: 600 } }}
            />
          </Grid>
          <Grid item xs={3.8}>
            <TextField
              label="Total Lives"
              size="small"
              variant="outlined"
              type="number"
              value={totalLives}
              onChange={e => onChange({ ...data, totalLives: Number(e.target.value) })}
              fullWidth
              sx={{
                bgcolor: "#f4fafe",
                borderRadius: 2.5,
                '& .MuiOutlinedInput-root': { borderRadius: 2.5 }
              }}
              inputProps={{ min: 0, style: { fontSize: 15.3, fontWeight: 600 } }}
            />
          </Grid>
        </Grid>

        {/* Sum Insured */}
        <Box sx={{
          fontWeight: 800,
          fontSize: 13.3,
          bgcolor: '#eaf4ff',
          color: '#296be5',
          px: 1.5, py: "2px", borderRadius: 2,
          letterSpacing: 1.1, mb: 1.2, mt: 1.6,
          display: "inline-block"
        }}>
          Sum Insured
        </Box>
        <RadioGroup row value={sumInsuredValue} onChange={e =>
          onChange({
            ...data,
            sumInsured: Number(e.target.value),
            sumInsuredManual: ""
          })}
          sx={{ mb: 0.5 }}
        >
          {SUM_INSURED_OPTIONS.map(val =>
            <FormControlLabel
              key={val}
              value={String(val)}
              control={
                <Radio sx={{
                  color: "#296be5",
                  '&.Mui-checked': { color: "#296be5" },
                  p: 0.8
                }} />
              }
              label={
                <Box
                  sx={{
                    border: sumInsuredValue === String(val) ? "2.1px solid #296be5" : "1.2px solid #e3eafc",
                    bgcolor: sumInsuredValue === String(val) ? "#eaf4ff" : "#fff",
                    color: "#292929",
                    px: 2.1, py: 0.6, borderRadius: 3.5, fontWeight: 700, fontSize: 15,
                    minWidth: 79, textAlign: "center"
                  }}
                >
                  {val.toLocaleString("en-IN")}
                </Box>
              }
              labelPlacement="end"
              sx={{ mr: 1.4, ml: "2px" }}
            />
          )}
          {/* Custom Entry */}
          <FormControlLabel
            value=""
            control={
              <Radio sx={{
                color: "#296be5",
                "&.Mui-checked": { color: "#296be5" },
                p: 0.8
              }} />
            }
            label={
              <TextField
                placeholder="Enter Sum Insured"
                variant="outlined"
                size="small"
                type="number"
                value={sumInsuredValue ? "" : sumInsuredManual}
                onFocus={() => onChange({ ...data, sumInsured: "", sumInsuredManual: "" })}
                onChange={e =>
                  onChange({
                    ...data,
                    sumInsured: "",
                    sumInsuredManual: e.target.value
                  })
                }
                sx={{
                  width: 128,
                  mx: 1,
                  bgcolor: sumInsuredValue ? "#fff" : "#eaf4ff",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: 2.5 },
                  "& input": { fontWeight: 700, fontSize: 15 }
                }}
                disabled={!!sumInsuredValue}
              />
            }
            labelPlacement="end"
            sx={{ ml: 0, mr: 0.2 }}
          />
        </RadioGroup>

        {/* Comment Box */}
        <Box sx={{
          fontWeight: 800,
          fontSize: 13.3,
          bgcolor: '#eaf4ff',
          color: '#296be5',
          px: 1.5, py: "2px", borderRadius: 2,
          letterSpacing: 1.1, mb: 1, mt: 1.9,
          display: "inline-block"
        }}>
          Add Comment
        </Box>
        <TextField
          value={comments}
          onChange={e => onChange({ ...data, comments: e.target.value })}
          placeholder="Add comments"
          size="small"
          fullWidth
          multiline
          rows={2}
          sx={{
            bgcolor: "#eaf4ff",
            borderRadius: 2.5,
            mt: 1,
            "& .MuiOutlinedInput-root": { borderRadius: 2.5 }
          }}
        />

        {/* Sum Insured Type */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2.2 }}>
          <Box sx={{
            fontWeight: 800, fontSize: 13.3,
            bgcolor: '#eaf4ff', color: '#296be5',
            px: 1.6, py: "2px", borderRadius: 2, letterSpacing: 1.1, mr: 2
          }}>
            Sum Insured Type
          </Box>
          <Box sx={{ display: "flex" }}>
            {SumTypeOptions.map((type) =>
              <SumInsuredTypePill
                key={type}
                value={type}
                selected={sumInsuredType === type}
                onClick={() => onChange({ ...data, sumInsuredType: type })}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
