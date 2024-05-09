import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

// Assuming 'post' is an object with 'id' and 'title' properties
interface Post {
  id: string | number;
  title: string;
}

interface PostSearchProps {
  posts: Post[];
}

// ----------------------------------------------------------------------

export default function PostSearch({ posts }: PostSearchProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
          },
        },
      }}
      options={posts}
      getOptionLabel={(post: Post) => post.title}
      isOptionEqualToValue={(option: Post, value: Post) => option.id === value.id}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
