$("#add-movie-form").on("submit", function(e) {
    e.preventDefault();

    let titleFieldValue = $("#title-field").val();

    if(titleFieldValue === "") {
        alert("Du måste ange en titel för att kunna spara filmen");
    }

    let ratingFieldValue = $("#rating-field").val();
    let parsedRatingFieldValue = parseInt(ratingFieldValue);

    if(!parsedRatingFieldValue && titleFieldValue !== "") {
        alert("Du måste ange ett betyg för att kunna spara filmen");
    }

    if(ratingFieldValue !== 0 && titleFieldValue !== "") {
        let movies = $("#movies");
        let score = "";

        for(let i = 0; i < parsedRatingFieldValue; i++) {
            score += `<img src="images/star.png" alt="Star">`;
        }

        let movie = `<li data-grade=${ratingFieldValue} data-title=${titleFieldValue}>
                        ${titleFieldValue}
                        <span class="movie-stars-and-delete-icon">
                            ${score}
                            <img src="images/delete.png" alt="Delete movie" class="delete-movie-icon">
                        </span>
                    </li>`;
        movies.append(movie);
    }

    $(".delete-movie-icon").on("click", function() {
        $(this).parent().parent().remove();
    });

    $("#add-movie-form").trigger('reset');
})
