const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const mapContainer = document.getElementById('map'), // 지도를 표시할 div 

	mapOption = {
		center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
		level: 3 // 지도의 확대 레벨

	};

function searchfeature() { // 로그인 이미 된 후 검색기능
	let place1 = document.getElementById('search').value;
	let placehistory = document.getElementById('srchresult').textContent;
	if (place1 == "") {
		if (placehistory == '') {
			place1 = "인천대입구역";
		} else {
			place1 = placehistory
		}
	} else {
		place1 = document.getElementById('srchresult').value;
	}

	const map = new kakao.maps.Map(mapContainer, mapOption);

	// 장소 검색 객체를 생성합니다
	const ps = new kakao.maps.services.Places();
	console.log(place1);
	// 키워드로 장소를 검색합니다
	ps.keywordSearch(place1, placesSearchCB);

	// 키워드 검색 완료 시 호출되는 콜백함수 입니다
	function placesSearchCB(data, status, pagination) {
		if (status === kakao.maps.services.Status.OK) {

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
			// LatLngBounds 객체에 좌표를 추가합니다
			var bounds = new kakao.maps.LatLngBounds();

			for (var i = 0; i < data.length; i++) {
				displayMarker(data[i]);
				bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
			}

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
			map.setBounds(bounds);
		}
	}

	// 지도에 마커를 표시하는 함수입니다
	function displayMarker(place1) {

		// 마커를 생성하고 지도에 표시합니다
		let marker = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(place1.y, place1.x)
		});

		// 마커에 클릭이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'click', () => {
			// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
			infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place1.place_name + '</div>');
			infowindow.open(map, marker);
		});
	}
}

function NotLoginsearchfeature() { // 로그인 안된상황
	place1 = document.getElementById('search').value;

	const map = new kakao.maps.Map(mapContainer, mapOption);

	// 장소 검색 객체를 생성합니다
	const ps = new kakao.maps.services.Places();

	// 키워드로 장소를 검색합니다
	ps.keywordSearch(place1, placesSearchCB);

	// 키워드 검색 완료 시 호출되는 콜백함수 입니다
	function placesSearchCB(data, status, pagination) {
		if (status === kakao.maps.services.Status.OK) {

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
			// LatLngBounds 객체에 좌표를 추가합니다
			var bounds = new kakao.maps.LatLngBounds();

			for (var i = 0; i < data.length; i++) {
				displayMarker(data[i]);
				bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
			}

			// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
			map.setBounds(bounds);
		}
	}

	// 지도에 마커를 표시하는 함수입니다
	function displayMarker(place) {

		// 마커를 생성하고 지도에 표시합니다
		let marker = new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(place.y, place.x)
		});

		// 마커에 클릭이벤트를 등록합니다
		kakao.maps.event.addListener(marker, 'click', () => {
			// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
			infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
			infowindow.open(map, marker);
		});
	}
}

searchfeature();