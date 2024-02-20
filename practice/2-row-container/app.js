

var app = angular.module('scrollTest', [])

app.directive('scrollableParentContainer', function () {
    return {
        restrict: 'A',
        scope: {
            data: '=',
            onDelete: '&deleteRecord'
        },
        link: function (scope, el, attrs) {
            const containerHeight = 100;
            const containerWidth = 1200;

            scope.createParent = function (container, children) {
                const parent = document.createElement('div')
                parent.classList.add('alterable-parent')
                parent.style.height = containerHeight;
                parent.style.width = containerWidth;
                container.appendChild(parent);
                if (children.length > 1) container.style.width += 1200;
                return parent;
            }

            scope.$watch('data', function (data, oldData) {
                if (data.length) {
                    const action = (data.length > oldData.length || data.length == oldData.length) ? 'add' : 'remove';
                    const sections = Array.from(document.querySelectorAll('.scrollable__parent .alterable-parent'))
                    const container = document.querySelector('.scrollable__parent')

                    let parent = (sections.length == 0) ? scope.createParent(container, sections) : sections[sections.length - 1];

                    let records = []
                    if (action == 'add') {
                        const diff = data.length - oldData.length;
                        records = data.slice(-diff)
                    } else {
                        records = data;
                        container.innerHTML = ''
                        parent = scope.createParent(container, [])
                    }

                    for (let rec of records) {
                        const child = document.createElement('div');
                        child.classList.add('drug')
                        child.textContent = rec;
                        parent.appendChild(child);

                        if (parent.scrollHeight > parent.clientHeight) {
                            parent.removeChild(child)
                            parent = scope.createParent(container, sections)
                            parent.appendChild(child)
                        }
                        child.onclick = () => angular.element(document.querySelector('.page-header')).scope().onDelete(rec)
                    }
                } else {
                    document.querySelector('.scrollable__parent').innerHTML = ''
                }
            })
        }
    }
});

app.controller('scrollController', function ($scope) {

    $scope.pageLabel = "scrollTest";
    $scope.savedDrugs = []


    $scope.drugs = [
        "Acetaminophen",
        "Adderall",
        "Amitriptyline",
        "Amlodipine",
        "Amoxicillin",
        "Ativan",
        "Atorvastatin",
        "Azithromycin",
        "Benzonatate",
        "Brilinta",
        "Bunavail",
        "Buprenorphine",
        "Cephalexin",
        "Ciprofloxacin",
        "Citalopram",
        "Clindamycin",
        "Clonazepam",
        "Cyclobenzaprine",
        "Cymbalta",
        "Doxycycline",
        "Dupixent",
        "Entresto",
        "Entyvio",
        "Farxiga",
        "Fentanyl Patch",
        "Gabapentin",
        "Gilenya",
        "Humira",
        "Hydrochlorothiazide",
        "Hydroxychloroquine",
        "Ibuprofen",
        "Imbruvica",
        "Invokana",
        "Januvia",
        "Jardiance",
        "Kevzara",
        "Leqvio",
        "Lexapro",
        "Lisinopril",
        "Lofexidine",
        "Loratadine",
        "Lyrica",
        "Melatonin",
        "Meloxicam",
        "Metformin",
        "Methadone",
        "Methotrexate",
        "Metoprolol",
        "Mounjaro",
        "Naloxone",
        "Naltrexone",
        "Naproxen",
        "Narcan",
        "Nurtec",
        "Omeprazole",
        "Onpattro",
        "Otezla",
        "Ozempic",
        "Pantoprazole",
        "Plan B",
        "Prednisone",
        "Probuphine",
        "Rybelsus",
        "secukinumab"
    ]

    $scope.addRecord = function () {
        if ($scope.savedDrugs.length == 0) {
            $scope.savedDrugs = [$scope.drugs[0]]
        } else if ($scope.savedDrugs.length != 64) {
            $scope.savedDrugs = [...$scope.savedDrugs, $scope.drugs[$scope.savedDrugs.length]]
        }
    }

    $scope.assign = function () {
        $scope.savedDrugs = $scope.drugs;
    }

    //$scope.assign();

    $scope.onDelete = function (match) {
        $scope.savedDrugs = $scope.savedDrugs.filter(rec => rec !== match)
        $scope.$apply()
    }

})