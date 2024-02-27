import React, { useState, useEffect } from "react";
import { Avatar, Grid, Box } from "@material-ui/core";
import { Favorite as FavoriteIcon, Star as StarIcon } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { GoogleLogin } from 'react-google-login';

import {gapi} from 'gapi-script';

const imgLink = "";

export default function Comment() {
    const [feedback, setFeedback] = useState([]);
    const { content_id } = useParams();
    const [user, setUser] = useState(null); // To store user information
    const [likedComments, setLikedComments] = useState(new Set()); // Track liked comments

    useEffect(() => {
        axios
          .get(`${API_BASE_URL}/feedback/${content_id}`)
          .then((response) => {
            setFeedback(response.data);
          })
          .catch((error) => {
            console.error("Error--->>", error);
          });
    }, [content_id]);

    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId:"303127054814-d9n8lg7uvki3qbvhtsn4ltr4j1qgea0g.apps.googleusercontent.com",
                scope:""
            })
        };
        gapi.load('client:auth2', start);

    });

    const [likes, setLikes] = useState(() => {
        const storedLikes = JSON.parse(localStorage.getItem('commentLikes')) || new Array(feedback.length).fill(0);
        return storedLikes;
    });
    const [ratings, setRatings] = useState(() => {
        const storedRatings = JSON.parse(localStorage.getItem('commentRatings')) || new Array(feedback.length).fill(0);
        return storedRatings;
    });

    useEffect(() => {
        localStorage.setItem('commentLikes', JSON.stringify(likes));
        localStorage.setItem('commentRatings', JSON.stringify(ratings));
    }, [likes, ratings]);

    const handleLike = (index) => {
        if (!user) {
            alert('Please login with Google to like feedback.');
            return;
        }

        const updatedLikes = [...likes];
        if (likedComments.has(index)) {
            updatedLikes[index]--;
            setLikedComments(prevLikedComments => {
                const updatedSet = new Set(prevLikedComments);
                updatedSet.delete(index);
                return updatedSet;
            });
        } else {
            updatedLikes[index]++;
            setLikedComments(prevLikedComments => new Set([...prevLikedComments, index]));
        }
        setLikes(updatedLikes);
        updateStarColor(index);
    };

    const updateStarColor = (index) => {
        const updatedRatings = [...ratings];
        const totalLikes = likes[index];
        const fullStars = Math.floor(totalLikes / 10);
        const remainingLikes = totalLikes % 10;
        let averageRating = fullStars + (remainingLikes >= 3 ? 0.5 : 0);

        updatedRatings[index] = averageRating;
        setRatings(updatedRatings);
    };

    const handleGoogleLoginSuccess = (response) => {
        setUser(response.profileObj); // Store user information upon successful login
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login failed', error);
    };

    return (
        <div style={{ padding: 10, display: "flex", justifyContent: "right", alignItems: "right", flexDirection: "column" }}>
            <h1>Feedback</h1>
            <GoogleLogin
                clientId="303127054814-d9n8lg7uvki3qbvhtsn4ltr4j1qgea0g.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
            {feedback.map((data, index) => (
                <Box key={index} width="100%" my={2}>
                    <motion.div
                        key={index}
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.5, duration: 0.5}}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src={imgLink} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{data.first_name}</h4>
                                <p style={{ textAlign: "left" }}>{data.feedback}</p>
                                <p style={{ textAlign: "left", color: "gray" }}>{moment(data.ctime).format("YYYY-MM-DD")}</p>
                                {user && (
                                    <Box display="flex" alignItems="center">
                                        <FavoriteIcon onClick={() => handleLike(index)} style={{ color: likedComments.has(index) ? "blue" : "grey", cursor: "pointer" }} />
                                        <span>{likes[index]}</span>
                                        <Box ml={2}>
                                            <Rating
                                                name={`rating-${index}`}
                                                value={ratings[index]}
                                                icon={<StarIcon fontSize="inherit" />}
                                                style={{ color: "#ffc107" }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </motion.div>
                </Box>
            ))}
        </div>
    );
}
