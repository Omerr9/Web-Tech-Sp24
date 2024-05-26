function fetchWorkouts(page = 1) {
  $.ajax({
    url: `/workouts/${page}`,
    method: "GET",
    success: function (data) {
      const container = $("#workout-container");
      container.empty(); // Clear the container

      if (data.workouts.length === 0) {
        container.append("<p>No workouts found.</p>");
      } else {
        data.workouts.forEach((workout) => {
          container.append(`
            <div class="col-12 col-md-4">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${workout.workoutName}</h5>
                  <p class="card-text">${workout.exercises}</p>
                  <p class="card-text">${workout.duration} minutes</p>
                  <p class="card-text">${new Date(
                    workout.date
                  ).toLocaleDateString()}</p>
                  <p class="card-text"><small class="text-muted">Uploaded By:: ${
                    workout.username
                  }</small></p>
                </div>
              </div>
            </div>
          `);
        });
      }

      // Pagination controls
      const pagination = `
      <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item ${data.page === 1 ? "disabled" : ""}">
          <a class="page-link" href="#" onclick="fetchWorkouts(${
            data.page - 1
          })">Previous</a>
        </li>
        ${Array.from(
          { length: data.totalPages },
          (_, i) => `
          <li class="page-item ${i + 1 === data.page ? "active" : ""}">
            <a class="page-link" href="#" onclick="fetchWorkouts(${i + 1})">${
            i + 1
          }</a>
          </li>
        `
        ).join("")}
        <li class="page-item ${
          data.page === data.totalPages ? "disabled" : ""
        }">
          <a class="page-link" href="#" onclick="fetchWorkouts(${
            data.page + 1
          })">Next</a>
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

// Fetch the first page of workouts on page load
$(document).ready(function () {
  fetchWorkouts();

  // Duration Check
  $("#workoutForm").submit(function (event) {
    var durationInput = $("#workoutDuration").val();
    if (durationInput <= 0) {
      alert("Please enter a duration greater than 0.");
      event.preventDefault(); // Prevent form submission
    }
  });
});
