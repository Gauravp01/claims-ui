import React, { useState } from "react";
import ClaimsOptionCard from "./components/ClaimsOptionCard";
import defaultOptions from "./data/defaultOptions.json";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function a11yProps(index) {
  return {
    id: `claims-tab-${index}`,
    'aria-controls': `claims-tabpanel-${index}`,
  };
}

export default function App() {
  const [options, setOptions] = useState(defaultOptions);
  const [tabValue, setTabValue] = useState(0); // 0: Expiring Terms

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleOptionChange = (index, nextData) => {
    const copy = [...options];
    copy[index] = nextData;
    setOptions(copy);
  };

  const handleClone = (idx) => {
    const newOption = {
      ...options[idx],
      label: `Option ${options.length + 1}`
    };
    setOptions([...options, newOption]);
  };

  const handleDelete = (idx) => {
    if (options.length === 1) return;
    setOptions(options.filter((_, i) => i !== idx));
    if (tabValue > 0 && tabValue === idx + 1) setTabValue(0);
  };

  const handleAddBlank = () => {
    const blank = {
      label: `Option ${options.length + 1}`,
      familyDefinition: "EMP",
      employees: 100,
      dependents: 100,
      totalLives: 100,
      sumInsured: 200000,
      sumInsuredManual: "",
      comments: "",
      sumInsuredType: "Family Floater"
    };
    setOptions([...options, blank]);
    setTabValue(options.length + 1);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f4fafe',
        py: 6,
        px: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: '0 4px 14px 0 rgb(220 226 249 / 60%)',
        minWidth: 980,
        maxWidth: 1150,
        px: 0,
        py: 0,
      }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ py: 2.3, px: 4, mb: 0, color: "#1d3557" }}
        >
          Claims Information
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          TabIndicatorProps={{
            sx: { background: "#296be5", height: 3, borderRadius: 2 }
          }}
          variant="scrollable"
          sx={{
            px: 2,
            '& .MuiTab-root': {
              bgcolor: '#eaf4ff',
              color: '#296be5',
              borderRadius: "15px 15px 0 0",
              mx: 1.1,
              fontWeight: 600,
              fontSize: 17,
              minWidth: 180,
              transition: "background 0.2s"
            },
            '& .Mui-selected': {
              bgcolor: '#fff',
              color: '#296be5'
            }
          }}
        >
          <Tab label="Expiring Terms" {...a11yProps(0)} />
          {options.map((op, idx) => (
            <Tab
              key={op.label}
              label={op.label}
              {...a11yProps(idx + 1)}
            />
          ))}
          <Button
            onClick={handleAddBlank}
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              ml: 2.8,
              color: "#296be5",
              bgcolor: "#eaf4ff",
              px: 2.2,
              fontWeight: 600,
              borderRadius: 3,
              height: 38,
              boxShadow: 0,
              "&:hover": { bgcolor: "#d0e0ff" }
            }}
          >
            Add Option
          </Button>
        </Tabs>

        <Box sx={{
          px: 5, pb: 4.5, pt: 2,
          bgcolor: "#f4fafe",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12
        }}>
          {/* Only the option cards row (like your screenshot) */}
          <Box sx={{
            display: "flex",
            gap: 3,
            mt: 3,
          }}>
            {options.map((option, idx) => (
              <ClaimsOptionCard
                key={"card_" + idx}
                data={option}
                index={idx}
                onChange={data => handleOptionChange(idx, data)}
                onClone={() => handleClone(idx)}
                onDelete={() => handleDelete(idx)}
                deletable={options.length > 1}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
