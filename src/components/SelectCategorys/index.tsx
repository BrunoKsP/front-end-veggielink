import React, { useEffect, useState } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { getAllCategorys, createCategory } from "../../services/Categorys";

interface Category {
  id: string;
  name: string;
}

interface SelectCategoryProps {
  onChange: (categoryId: string) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ onChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategorys();
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    onChange(categoryId);
  };

  const handleNewCategoryClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategoryName("");
  };

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory({
        name: newCategoryName,
      });
      const newCategoryId = response.data.id;
      setCategories((prevCategories) => [
        ...prevCategories,
        { id: newCategoryId, name: newCategoryName },
      ]);
      setSelectedCategory(newCategoryId); 
      onChange(newCategoryId);
      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  return (
    <FormControl fullWidth>
      <Select
        label="Selecione uma categoria"
        value={selectedCategory}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem onClick={handleNewCategoryClick}>Nova Categoria</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nova Categoria</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newCategoryName"
            label="Nome da Categoria"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCreateCategory}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
};

export default SelectCategory;
