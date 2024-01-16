import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';

import Header from '../../components/Header';

const defaultTheme = createTheme();
const reviewsPerPage = 6;

const Contact = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getFeedbacks();
    }, []);

    const getFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:5000/feedback/feedbacks');
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleAddReview = async () => {
        const newReview = { name, description, rating };

        try {
            const response = await fetch('http://localhost:5000/feedback/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                const savedReview = await response.json();
                setReviews([...reviews, savedReview]);
                setOpen(false);
                setName('');
                setDescription('');
                setRating(0);
            } else {
                console.error('Failed to add review:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <main className='aboutHeader'>
            <Header />
                <Box
                    sx={{
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="white"
                            gutterBottom
                        >
                            Leave your feedback about the store
                        </Typography>
                        <Typography variant="h5" align="center" color="white" paragraph>
                            Your feedback motivates us to develop and makes us better
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                style={{
                                    color: "white",
                                    border: "3px solid white",
                                    width: "270px",
                                    fontSize: "24px",
                                }}
                                variant="outlined"
                                onClick={handleClickOpen}
                            >
                                Give feedback
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {currentReviews.map((review, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {review.name}
                                        </Typography>
                                        <Typography>{review.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Rating name="read-only" value={review.rating} readOnly />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={Math.ceil(reviews.length / reviewsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            sx={{
                                '& .MuiPaginationItem-page.Mui-selected': {
                                    backgroundColor: '#fff',
                                    color: '#000',
                                },
                                '& .MuiPaginationItem-page': {
                                    color: '#fff',
                                },
                                '& .MuiPaginationItem-icon': {
                                    color: '#fff', 
                                },
                            }}
                        />
                    </Box>
                </Container>
            </main>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Leave Feedback</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide your feedback below:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddReview}>Add Review</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default Contact;
