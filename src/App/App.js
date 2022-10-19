import React, { useEffect, useState } from 'react';
import { Button, Stack, Form } from 'react-bootstrap';
import GalleryItem from "./GalleryItem";
import './App.css';
import './custom.css'




function App() {

  const MEMES_URL = "https://api.imgflip.com/get_memes";
  const [memeUrls, setMemeUrls] = useState([]);
  const [nums, setNums] = useState(0);

  useEffect(() => {
    loadMemes({});
  }, []);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  const loadMemes = async ({ length, isRandom }) => {

    await fetch(MEMES_URL)
      .then(res => {
        return res.json();
      })
      .then((result) => {

        var images = result.data.memes.map(meme => meme.url);

        if (isRandom != null) {
          images = shuffle(images);
        }

        if (length != null) {
          images = images.slice(0, length);
        }

        setNums(images.length)
        setMemeUrls(images);
      }).catch(err => {
        console.error(err);
      })
  }

  const validateNums = (e) => {

    var numbers = parseInt(e.target.value);
    if (Number.isInteger(numbers)) {
      setNums(numbers);
    }
    else {
      setNums(0);
    }

  }
  const handleClick = () => {
    loadMemes({ length: nums });
  }

  const randomizeMemes = () => {
    loadMemes({ length: nums, isRandom: true })
  }
  return (
    <div className="App">

      <div className="navigation nav col-md-5 mx-auto mt-5">


        <Stack direction="horizontal" className="nav-stack" gap={4}>
          <Form>
            <Form.Group className="" controlId="numsInput">
              <Form.Control type="text" placeholder="Enter numbers of picture"
                value={nums}
                onChange={(e) => validateNums(e)}
              />
            </Form.Group>
          </Form>
          <Button className="nav-btn" variant="outline-primary" onClick={handleClick}>
            Get meme
          </Button>
          <Button className="nav-btn" variant="outline-success" onClick={randomizeMemes}>
            Randomize
          </Button>
        </Stack>

      </div>

      <div className="gallery-contain col-md-5 mx-auto mt-5 border" >


        {
          memeUrls.map((url, index) =>
            <GalleryItem key={index} memeURL={url} />
          )
        }
      </div>

    </div>
  );
}

export default App;
