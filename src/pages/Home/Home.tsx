import { Button, CircularProgress, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Postinit{
  title: string,
  url: string,
  created_at: Date,
  author: string
}

interface Column {
  id: 'title' | 'url' | 'created_at' | 'author',
  label: string,
  minWidth?: number,
  align?: 'right'
}

const columns: Column[] = [
  {id: 'title', label: 'Title', minWidth: 170},
  {id: 'url', label: 'URL', minWidth: 150},
  {id: 'created_at', label: 'Created At', minWidth: 100},
  {id: 'author', label: 'Author', minWidth: 100},
]

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [localPage, setLocalPage] = useState<number>(1);
  const [posts, setPosts] = useState<Postinit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalElement, setTotalElement] = useState<number>(0);
  const rowPerPage: number = 10;


  useEffect(() => {
    
    const interval = setInterval(() => {
      setPage((_page) => _page + 1) 
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    getPost();
  }, [page]);

  const getPost = async () => {
    try {
      const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
      const data = await res.json();

      const _posts = [...posts, ...data.hits];
      setPosts(_posts);
      setTotalElement(_posts.length);
  } catch (error) {
      console.log(error);
  }
  }

  const handleChangePage = (event: unknown, pageNum: number) => {
    setLocalPage(pageNum);
  }

  const getDetails = (post: Postinit) => {
    navigate('/details', {
      state: post
    })
  }

  return (
          <div data-testid='home'>
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{margin: '100px auto'}}>
                  {
                    loading?
                    <CircularProgress />
                    :
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {
                              columns?.map(column => 
                                <TableCell
                                key={column?.id}
                                align={column?.align}
                                style={{minWidth: column?.minWidth}}>
                                  {column?.label}
                                </TableCell>
                                )
                            }
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                          posts.slice((localPage - 1) * rowPerPage, (localPage - 1) * rowPerPage + rowPerPage).map((post) => <TableRow
                          key={post?.title}
                          onClick={() => getDetails(post)}
                          >
                            <TableCell>{post?.title}</TableCell>
                            <TableCell>{post?.url}</TableCell>
                            <TableCell>{post?.created_at}</TableCell>
                            <TableCell>{post?.author}</TableCell>
                          </TableRow>)
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {
                      posts.length > 10 &&
                    //   <TablePagination
                    //   rowsPerPageOptions={[]}
                    //   component="div"
                    //   count={totalElement}
                    //   rowsPerPage={rowPerPage}
                    //   page={localPage}
                    //   onPageChange={handleChangePage}
                    // />
                    <Pagination
                      count={totalElement / 10}
                      page={localPage}
                      onChange={handleChangePage}
                     />
                    }
                    
                    </Paper>
                  }
                </Grid>
            </Grid>
          </div>
        );
      }

export default Home;