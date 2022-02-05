import { Button, CircularProgress, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";
import ApiService from '../../Service/ApiService';

export interface PostStruc{
  title: string,
  url: string,
  created_at: Date,
  author: string
}

interface TableColumn {
  id: 'title' | 'url' | 'created_at' | 'author',
  label: string,
  minWidth?: number,
  align?: 'right'
}

const columns: TableColumn[] = [
  {id: 'title', label: 'Title', minWidth: 170},
  {id: 'url', label: 'URL', minWidth: 150},
  {id: 'created_at', label: 'Created At', minWidth: 100},
  {id: 'author', label: 'Author', minWidth: 100},
]

const Home = () => {
  const history = useHistory();
  const [page, setPage] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostStruc[]>([]);
  const [allPosts, setAllPosts] = useState<number>(0);
  const rows: number = 10;


  useEffect(() => {
    
    const interval = setInterval(() => {
      setPage((_page) => _page + 1) 
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    getApi();
  }, [page]);

  const getApi = async () => {
    try {
        const {data} = await ApiService.getPost(page);
        const postsContainer = [...posts, ...data.hits];
        setPosts(postsContainer);
        setAllPosts(postsContainer?.length);
    } catch (error) {
      console.log(error);
  }
  }

  const handleChangePage = (event: unknown, pageNum: number) => {
    setPaginationPage(pageNum);
  }

  const getDetails = (post: PostStruc) => {
    history.push({
      pathname: '/details',
      state: post
    })
  }

  return (
          <div data-testid='home'>
            <Grid container spacing={2}>
                <Grid item xs={8} sx={{margin: '100px auto'}}>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table" data-testid='dataTable'>
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
                        posts.slice((paginationPage - 1) * rows, (paginationPage - 1) * rows + rows).map((post) => <TableRow
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
                    <Pagination
                      count={allPosts / 10}
                      page={paginationPage}
                      onChange={handleChangePage}
                    />
                  }
                  
                  </Paper>
                </Grid>
            </Grid>
          </div>
        );
      }

export default Home;