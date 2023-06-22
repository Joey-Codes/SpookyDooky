import '../styles/about.css'
import StarRatings from 'react-star-ratings';

export const About = () => {
    return (
        <div className="flex about about-text">
            <div>
                <br />
                <br />
                <div className='about-row'>
                    <h1 className='readexpro rp2 italic mr'>ABOUT</h1>
                    <h1 className='readexpro rp2 red italic'>SPOOKY DOOKY</h1>
                </div>
                <br />
                <br />
                <h2 className='readexpro'>Spooky Dooky allows anyone to rate spooky places 
                    and share their experiences with different types of phenomena. You can 
                    choose to review places anonymously, or create an account to keep track 
                    of all your reviews. Also note that the site is intended for real experiences, 
                    and while we cannot verify the truthfulness of reviews, we ask that users 
                    not fabricate stories or images.
                </h2>
                <br />
                <h1 className='readexpro rp2 red italic'>1. Locations</h1>
                <h2 className='readexpro'>You can find a location to review in the 'Places' tab, 
                    where you can use the searchbar to quickly find a place or use the filters to 
                    look for specific categories, such as locations by rating or geographic area. 
                </h2>
                <h2 className='readexpro'>If you would like to add a new place to review, click on 
                    the 'Add' button and search for a location. If the location already has reviews, 
                    you will be redirected to its specific page. 
                </h2>
                <br />
            </div>
            <div>
                <div>
                    <h1 className='readexpro rp2 red italic'>2. Reviews</h1>
                    <h2 className='readexpro'>The first aspect of a review is its Spookiness Rating. 
                        This is a subjective measure, from 1 to 5 stars, of how scary you found the 
                        location to be, which contributes to its overall score. 
                    </h2>
                    <StarRatings
                        className="star-rating"
                        rating={5} // Replace with your actual rating value
                        starRatedColor="red" // Customize the color of the filled stars
                        starEmptyColor="lightgray" // Customize the color of the empty stars
                        starDimension="80px" // Adjust the size of the stars
                        starSpacing="2px" // Adjust the spacing between stars
                    />
                </div>
                <br />
                <br />
                <br />
                <div>
                    <h2 className='readexpro'>The next part of a review is it category. All reviews 
                        all categorized by the type of phenomena it describes. The four categories -
                        Ghosts, Aliens, Cryptids, and Unexplained are explained below.
                    </h2>
                    <br />
                    <div className='about-row'>
                        <button className='h-b2 h-b2a bangers b2 mr category-fit'>Ghosts &#x1F47B;</button>
                        <h2 className='readexpro text'>This includes ghosts, spirits, poltergeists,
                                                  and any other related entities. It also includes
                                                  any type of phenomena usually associated with hauntings.          
                        </h2>
                    </div>
                    <br />
                    <div className='about-row'>
                        <button className='h-b2 h-b2b bangers b2 mr category-fit'>ALIENS &#x1F47D;</button>
                        <h2 className='readexpro text'>This includes things like suspected alien 
                                                  encounters, alien abducations, UFO sightings or encounters,
                                                  and any other related direct or indrect phenomena.
                        </h2>
                    </div>
                    <br />
                    <div className='about-row'>
                        <button className='h-b2 h-b2c bangers b2 mr category-fit'>CRYPTIDS &#x1F479;</button>
                        <h2 className='readexpro text'>This includes animals or creatures not yet officially confirmed 
                                                  to exist, often being the subject of legends and myth. Some notable 
                                                  examples includes Bigfoot, the Yeti, Chupacabra, and Mothman. 
                        </h2>
                    </div>    
                    <br />
                    <div className='about-row'>
                        <button className='h-b2 h-b2d bangers b2 mr category-fit'>UNEXPLAINED &#x2754;</button>
                        <h2 className='readexpro text'>This category includes anything paranormal that does not fit into any 
                                                  of the categories listed above. Any phenomena that seems to defy logical or
                                                  natural explanations can belong into this category.      
                        </h2>
                    </div>
                    <br />
                    <br />
                    <br />
                    <h2 className='readexpro'> All reviews include a description of the experience, which can be as detailed as you like.
                        Additionally, you can also add photos to the review if there is a specific phenonemon you believe 
                        you have captured.  
                    </h2>
                </div>
            </div>
        </div>
    )
};