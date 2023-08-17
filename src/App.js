import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeContext } from '@/context';
import router from '@/router';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <RouterProvider
            router={router}
          />
        </div>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;
