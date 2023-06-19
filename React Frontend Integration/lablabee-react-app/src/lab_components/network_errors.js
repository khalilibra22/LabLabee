import NoConnectionImage from '../assets/sammy-no-connection.gif';
export default function NetworkError() {
    return (
        <div>
            <img src={NoConnectionImage} alt="GIF Image" />
            <p>Network Error: Unable to connect. Please check your internet connection., <a href="/">Retry again</a></p>

        </div>
    );
  }