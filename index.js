import { faker } from '@faker-js/faker';

function generatePerson() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const displayName = faker.internet.displayName({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });

  const userName = faker.internet.userName({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });
  return { displayName, userName };
}

function trueOrFalse() {
  const value = Math.round(Math.random() * 1);
  if (value === 0) {
    return false;
  } else {
    return true;
  }
}

function generateTweet() {
  function generateTweetText() {
    const tweetText = faker.word.words({ count: { min: 1, max: 80 } });
    return tweetText;
  }

  function generatePicture() {
    const picOrNoPic = trueOrFalse();
    if (picOrNoPic) {
      return faker.image.url();
    } else {
      return null;
    }
  }

  function getCurrentDate() {
    return new Date();
  }

  function viewsAndRetweetsAndSavesGenerator() {
    const views = Math.round(Math.random() * 1000000000);
    const retweets = Math.round(Math.random() * views);
    const saves = Math.round(Math.random() * views);
    return { views, retweets, saves };
  }

  function generateComments() {
    const numOfComments = Math.round(Math.random() * 100);
    const commentsArr = [];
    function createCommentObj() {
      const commentObj = {
        user: {
          displayName: generatePerson().displayName,
          userName: generatePerson().userName,
          isVerified: trueOrFalse(),
          profilePicture: generatePicture(),
        },
        post: {
          text: generateTweetText(),
          picture: generatePicture(),
        },
        dateCreated: getCurrentDate(),
        views: viewsAndRetweetsAndSavesGenerator().views,
        retweets: viewsAndRetweetsAndSavesGenerator().retweets,
        saves: viewsAndRetweetsAndSavesGenerator().saves,
      };
      return commentObj;
    }

    for (let i = 0; i <= numOfComments; i++) {
      commentsArr.push(createCommentObj());
    }
    return commentsArr;
  }

  const newTweet = {
    user: {
      displayName: generatePerson().displayName,
      userName: generatePerson().userName,
      isVerified: trueOrFalse(),
      profilePicture: generatePicture(),
    },
    post: {
      text: generateTweetText(),
      picture: generatePicture(),
    },
    dateCreated: getCurrentDate(),
    views: viewsAndRetweetsAndSavesGenerator().views,
    retweets: viewsAndRetweetsAndSavesGenerator().retweets,
    saves: viewsAndRetweetsAndSavesGenerator().saves,
    comments: generateComments(),
  };

  return newTweet;
}

console.log(generateTweet());
