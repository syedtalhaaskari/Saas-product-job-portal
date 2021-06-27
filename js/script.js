document.querySelector(".button-container").addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text)
        showJobs(filteredJobs)
    })
})

function toggleMode() {
    let toggle = document.getElementById("colorMode").checked;
    var r = document.querySelector(':root')
    if (toggle) {
        r.style.setProperty('--theme-bg-color', 'white');
        r.style.setProperty('--theme-color', '#11121A');
        r.style.setProperty('--bg-color', 'white');
        r.style.setProperty('--border-color', '#1C1C24');
        r.style.setProperty('--search-border-color', '#222328');
    } else {
        r.style.setProperty('--theme-bg-color', '#11121A');
        r.style.setProperty('--theme-color', 'white');
        r.style.setProperty('--bg-color', '#1C1C24');
        r.style.setProperty('--border-color', 'white');
        r.style.setProperty('--search-border-color', 'white');
        
    }
}

function switchViewMode(mode) {
    let jobsContainer = document.querySelector(".jobs-container")
    let jobTiles = document.querySelectorAll(".job-tile");

    if (mode === "grid") {
        jobsContainer.style.setProperty('display', 'grid');
        jobTiles.forEach(jobTile => jobTile.style.setProperty('margin-bottom', '0'))
    } else {
        jobsContainer.style.setProperty('display', 'inline-block');
        jobTiles.forEach(jobTile => jobTile.style.setProperty('margin-bottom', '40px'))
    }
}

function getJobs() {
    return fetch("data.json")
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredJobs = jobs.filter(job => {
            if (
                job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                || job.company.toLowerCase().includes(searchText)
                || job.requirements.content.toLowerCase().includes(searchText)
            ) {
                return true
            } else {
                return false;
            }
        })
        return filteredJobs
    } else {
        return jobs
    }
}

function showJobs(jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    document.getElementById("number-of-jobs").innerHTML = `Showing ${jobs.length} Jobs`
    jobs.forEach(job => {
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="">
                    <span class="material-icons more_horiz">
                        more_horiz
                    </span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
        `
    })

    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data)
});