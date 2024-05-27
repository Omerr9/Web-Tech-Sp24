function fetchWorkouts(page = 1, searchQuery = "") {
  $.ajax({
    url: `/workouts/${page}?query=${encodeURIComponent(searchQuery)}`,
    method: "GET",
    success: function (data) {
      const container = $("#workout-container");
      container.empty();

      if (data.workouts.length === 0) {
        container.append("<p>No workouts found.</p>");
      } else {
        data.workouts.forEach((workout) => {
          container.append(`
            <div class="col-12 col-md-4">
              <div class="card mb-3">
                <div class="card-body" wid="${workout._id}">
                  <h5 class="card-title">${workout.workoutName}</h5>
                  <p class="card-text">${workout.exercises}</p>
                  <p class="card-text">${workout.duration} minutes</p>
                  <p class="card-text">${new Date(
                    workout.date
                  ).toLocaleDateString()}</p>
                  <p class="card-text"><small class="text-muted">Uploaded By: ${
                    workout.username
                  }</small></p>
                  <a class="btn btn-primary" href="/workout/delete/${
                    workout._id
                  }">Delete Workout</a>
                </div>
              </div>
            </div>
          `);
        });
      }

      const pagination = `
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item ${data.page === 1 ? "disabled" : ""}">
              <a class="page-link" href="#" onclick="fetchWorkouts(${
                data.page - 1
              }, '${searchQuery}')">Previous</a>
            </li>
            ${Array.from(
              { length: data.totalPages },
              (_, i) => `
              <li class="page-item ${i + 1 === data.page ? "active" : ""}">
                <a class="page-link" href="#" onclick="fetchWorkouts(${
                  i + 1
                }, '${searchQuery}')">${i + 1}</a>
              </li>
            `
            ).join("")}
            <li class="page-item ${
              data.page === data.totalPages ? "disabled" : ""
            }">
              <a class="page-link" href="#" onclick="fetchWorkouts(${
                data.page + 1
              }, '${searchQuery}')">Next</a>
            </li>
          </ul>
        </nav>
      `;
      container.append(pagination);
    },
    error: function (error) {
      console.error("Error fetching workouts:", error);
    },
  });
}

function handleSearch(searchQuery = null) {
  const query = searchQuery || $("#search-query").val();
  fetchWorkouts(1, query);
}

function fetchStoredSearches() {
  $.ajax({
    url: "/searches",
    method: "GET",
    success: function (data) {
      const dropdown = $("#search-history-dropdown");
      dropdown.empty();

      if (data.searches.length === 0) {
        dropdown.append(
          "<li class='dropdown-item'>No search history found.</li>"
        );
      } else {
        data.searches.forEach((search) => {
          dropdown.append(
            `<li class='dropdown-item'><a href="#" onclick="handleSearch('${search}')">${search}</a></li>`
          );
        });
      }
      dropdown.show();
    },
    error: function (error) {
      console.error("Error fetching search history:", error);
    },
  });
}

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("query") || "";
  $("#search-query").val(searchQuery);
  fetchWorkouts(1, searchQuery);

  $("#search-btn").click(function () {
    handleSearch();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest(".input-group").length) {
      $("#search-history-dropdown").hide();
    }
  });
});
