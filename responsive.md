# 반응형 순서

## 모바일을 먼저 작업할 때...
```css
/* 모바일 세로 */
.wrapper {width: 320px;}

/* 모바일 가로 */
@media screen and (min-width: 576px) {
	
}

/* 태블릿 세로 */
@media screen and (min-width: 768px) {
	
}

/* 태블릿 가로 */
@media screen and (min-width: 992px) {
	
}

/* PC */
@media screen and (min-width: 1200px) {

}
```

## PC버전을 먼저 작업할 때...
```css
/* PC */
.wrapper {width: 100%; max-width: 1200px; margin: auto;}

/* 태블릿 가로 */
@media screen and (max-width: 1199px) {
	
}

/* 태블릿 세로 */
@media screen and (max-width: 991px) {
	
}

/* 모바일 가로 */
@media screen and (man-width: 767px) {
	
}

/* 모바일 세로 */
@media screen and (man-width: 575px) {

}
```