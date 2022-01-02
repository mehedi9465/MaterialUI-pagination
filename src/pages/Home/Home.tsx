import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface PostType{
  title: string,
  url: string,
  created_at: string,
  author: string
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [currentInterval, setCurrentInterval] = useState<any>();
  const [nbHits, setNbHits] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts(pageNum);

    const interval = setInterval(() => {
      getPosts(pageNum);
    }, 10000);
    setCurrentInterval(interval);

    return () => clearInterval(currentInterval)
  }, [])

  const getPosts = (pageNum: number) => {
    try {
      setLoading(true);
      axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`)
      .then(({ data }) => {
        setPosts(data.hits)
        setNbHits(data.nbHits)
        alert('loaded');
      })
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
      
    }
  }
  
  const handleChangePage = (event: unknown, pageNum:number) => {
    if(pageNum === 0){
      getPosts(pageNum);
      
    }
    else{
      clearInterval(currentInterval)
    }

    setPageNum(pageNum);
    getPosts(pageNum);
  }

  const handleRedirect = (post: PostType) => {
    navigate("/details", { state: post })
  }

    return (
          <Grid container spacing={2}>
            <Grid item xs={8} sx={{margin: '100px auto'}}>
              {
                Loading?
                <CircularProgress />
                :
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Url</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    {
                      Loading?
                      <CircularProgress />
                      :
                      <TableBody>
                      {
                        posts.map((post) => <TableRow
                        key={post?.title}
                        >
                          <TableCell>{post?.title}</TableCell>
                          <TableCell>{post?.url}</TableCell>
                          <TableCell>{post?.created_at}</TableCell>
                          <TableCell>{post?.author}</TableCell>
                          <TableCell> <Button onClick={() => handleRedirect(post)} variant='outlined' size='small'>Details</Button> </TableCell>
                        </TableRow>)
                        }
                      </TableBody>
                    }
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={nbHits}
                  rowsPerPage={posts?.length}
                  page={pageNum}
                  onPageChange={handleChangePage}
                />
                </Paper>
              }
            </Grid>
        </Grid>
    );
};

export default Home;