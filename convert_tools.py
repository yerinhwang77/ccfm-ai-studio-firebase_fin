
import csv
import io
from urllib.parse import urlparse

data = """department	category	tool_name	description	manual_link	service_url	login_id	login_pw	memo	in_use (Y/N)	is_paid (Y/N)	해지 여부 / 비번 변경 등 특이사항
콘크리트 파머스	운영관리	아임웹(숏폼,상세페이지,쿠팡)	숏폼 랜딩페이지, 상세페이지, 쿠팡 연동 웹사이트 제작 플랫폼		https://imweb.me	support@samchomaeul.com (구글 연동)	Tkach323#@# (첫 문자 대문자 주의)		Y	Y	
콘크리트 파머스	운영관리	아임웹(마케팅사업부)	마케팅사업부 전용 웹사이트 제작 및 관리 플랫폼		https://imweb.me	support@mkm20201101.com (구글 연동)	Moment1!		Y	Y	
콘크리트 파머스	운영관리	ccfm (워드프레스)	워드프레스 기반 웹사이트 및 블로그 운영 플랫폼		https://ccfm.co.kr/wp-admin/admin.php?page=chromeapp-helper-banner 	"chungchoegg
"	"tkach1212!
"	API: wRTc jGnQ 7SII V5h6 2sDA 76S4	Y	Y	
콘크리트 파머스	데이터분석	뷰저블(자사)	히트맵, 스크롤맵 등 사용자 행동 분석 UX 애널리틱스 툴		https://www.beusable.net	ccfmedu@ccfm.co.kr	Moment1!		Y	Y	
콘크리트 파머스	생산성	탈리	간편한 온라인 설문조사 및 폼 빌더		https://tally.so	support@mkm20201101.com	ahajsxm12!@		Y	Y	
콘크리트 파머스	비디오AI	캡컷(Capcut)	AI 기반 숏폼 영상 편집 및 자동 자막 생성 툴		https://www.capcut.com	ccfmbrandmkt@gmail.com(구글 연동)	qmaktlf12!@		Y	Y	
콘크리트 파머스	운영관리	솔라피	문자, 알림톡, 친구톡 대량 발송 메시징 서비스		https://solapi.com	admin@mkm20201101.com	ahajsxm12!@	2단계 인증비번: 123456	Y	Y	
콘크리트 파머스	협업	줌(zoom)	화상회의 및 웨비나 진행 플랫폼		https://zoom.us	ccfmedu@ccfm.co.kr	Ahajsxm12!@	소셜로그인도 가능	Y	Y	
콘크리트 파머스	생산성 AI	클로드 Max 플랜	Anthropic의 고급 AI 어시스턴트 구독 서비스		https://claude.ai	ccfmbrandmkt@gmail.com	tkach212@!@		Y	Y	
콘크리트 파머스	생산성 AI	Make 노코드 툴	앱 간 워크플로우 자동화 노코드 플랫폼		https://www.make.com	ai@ccfm.co.kr	ahajsxm12!@		Y	Y	
콘크리트 파머스	운영관리	아웃코드	국내 SaaS 연동 특화 업무 자동화 노코드 툴		https://outcode.biz	ccfmbrandmkt@gmail.com	qmaktlf12!@(지메일연동)		Y	Y	
콘크리트 파머스	데이터분석	블랙키위	네이버 키워드 검색량 및 경쟁도 분석 SEO 툴		https://blackkiwi.net	support@mkm20201101.com	모먼트12!@		Y	Y	
콘크리트 파머스	디자인	망고보드	템플릿 기반 카드뉴스, 썸네일, SNS 콘텐츠 디자인 툴		https://www.mangoboard.net	support@mkm20201101.com	ahajsxm12!@		Y	Y	
콘크리트 파머스	운영관리	모두싸인	온라인 전자계약 및 문서 서명 서비스		https://modusign.co.kr	admin@ccfm.co.kr	ahenTkdls12!@		Y	Y	
콘크리트 파머스	데이터분석	썸트렌드	소셜 빅데이터 기반 트렌드 및 키워드 분석 플랫폼		https://some.co.kr	support@mkm20201101.com	ahajsxm12!@	소셜로그인 구글	Y	Y	
콘크리트 파머스	인사이트	퍼블리 계정	비즈니스 인사이트 및 실무 콘텐츠 구독 서비스		https://publy.co	admin@mkm20201101.com	ahajsxm12!@		Y	Y	
콘크리트 파머스	운영관리	가비아(ccfmedu도메인)	ccfmedu 도메인 등록 및 호스팅 관리 서비스		https://www.gabia.com	ccfmedu@ccfm.co.kr	ahajsxm12!@		Y	Y	
콘크리트 파머스	미디어 소스	artlist	로열티프리 음원, 효과음, 영상 클립 소스 구독 서비스		https://artlist.io	support@mkm20201101.com	ahajsxm12!@		Y	Y	
콘크리트 파머스	일반	스티비 	급상승 뉴스레터 발송을 위한 스티비 결제 (스탠다드 요금제) 		https://stibee.com/	ccfmbrandmkt@gmail.com	qmaktlf12!@		Y	Y	
콘크리트 파머스	AI	젠스파크	AI 슬라이드, 시트 기능		https://www.genspark.ai/	ccfmbrandmkt@gmail.com	qmaktlf12!@		Y	Y	
브랜드사업부	생산성 AI	Chat GPT	생산형 AI 툴		https://chat.openai.com	ccfmbrand@gmail.com	qmfosemtkdjqqn12#		Y	Y	
브랜드사업부	비디오AI	Runway	AI 영상 제작 및 편집		https://runwayml.com	ccfmbrand@gmail.com	qmfosemtkdjqqn12#		Y	Y	
브랜드사업부	생산성 AI	클로드	생산형 AI 툴		https://claude.ai	ccfmbrand@gmail.com	qmfosemtkdjqqn12#		Y	Y	
브랜드사업부	비디오AI	Akool	딥페이크 소스 활용		https://akool.com	ccfmbrand@gmail.com	qmfosemtkdjqqn12#		Y	Y	
브랜드사업부	비디오AI	탑뷰	AI 비디오 편집		https://www.topview.ai	ccfmbrand@gmail.com	qmfosemtkdjqqn12#		Y	Y	
브랜드사업부	비디오AI	구글 플로우	브랜드사업부 Veo3 활용을 통한 콘텐츠 소스 생성		https://aistudio.google.com/models/veo-3	ccfm0020@gmail.com	zhszm123$		Y	Y	
마케팅사업부	일반	카페24	어드민 호스팅 서비스		https://www.cafe24.com/	ccfmacademy	ahajsxm12!@		Y	Y	
마케팅사업부	미디어 소스	artlist	음향효과 		https://artlist.io/	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	미디어 소스	셔터스톡	음향효과 및 사진 컨텐츠 참고 		https://www.shutterstock.com/ko/	mkm506413@gmail.com	mkmahajsxm12!@		Y	Y	
마케팅사업부	미디어 소스	타입캐스트	비디오 콘텐츠 활용 (음성다운)		https://typecast.ai/kr	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	비디오AI	elevenlabs	AI더빙 		https://elevenlabs.io/	admin@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	생산성	MAKE	업무 자동화를 위한 솔루션 도입		https://www.make.com/en/ai-automation	ai@ccfm.co.kr	ahajsxm12!@ 		Y	Y	
마케팅사업부	생산성	탈리	셀캠 고객사 DB수집을 위한 "탈리" 업무툴 월 구독료 결제 요청		https://tali.ai/	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	운영관리	아임웹	마케팅사업부 DB 확보		https://imweb.me/	admin@mkm20201101.com	Ahajsxm12!@		Y	Y	
마케팅사업부	데이터분석	블랙키위	키워드 검색량 조회 및 분석		https://blackkiwi.net/	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	데이터분석	썸트렌드	소셜 언급량 분석		https://some.co.kr/	support@mkm20201101.com	ahajsxm12		Y	Y	
마케팅사업부	데이터분석	씨그로 대시보드 정기결제	광고주 데이터 자동화 툴		https://www.cigro.io/	mkm506413@gmail.com	ahajsxm12!@		Y	Y	
마케팅사업부	디자인	망고보드	확인 필요		https://www.mangoboard.net/	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	인사이트	퍼블리	마케팅전략 및 콘텐츠 제공		https://publy.co/	admin@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	디자인	클립아트코리아	라이선스, 이미지 다운		https://www.clipartkorea.co.kr/	mkm202011	mkmahajsxm12!@		Y	Y	
마케팅사업부	디자인	유토이미지	유료 이미지,컨텐츠 다운		https://www.utoimage.com/	mkm20201101	ahajsxm12!@		Y	Y	
마케팅사업부	디자인	릭스폰트	유료 폰트 사용		https://www.rixfontcloud.com/	mkm506413@gmail.com	ahajsxm12!@		Y	Y	
마케팅사업부	디자인	Ideogram AI	이미지 생성형 AI툴 신규 결제		https://ideogram.ai				Y	Y	
마케팅사업부	검색광고	스마트로그	검색광고팀 자동입찰 프로그램		https://smlog.co.kr				Y	Y	
마케팅사업부	디자인	망고보드	디자인 툴		https://www.mangoboard.net/				Y	Y	
마케팅사업부	디자인	미드저니	ai이미지생성		https://www.midjourney.com/home	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	디자인	미드저니	ai이미지생성		https://www.midjourney.com/home	admin@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	운영관리	아마존	이사님 사용 목적		https://aws.amazon.com/ko/	mkm506413@gmail.com	ahajsxm12!@		Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmDA1@gmail.com	zhszmflxm123$	생성자: 동재원 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmDA2@gmail.com	zhszmflxm123$	생성자: 민길상 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmDA3@gmail.com	zhszmflxm123$	생성자: 전승탁 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmDA4@gmail.com	zhszmflxm123$	생성자: 윤신혁 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmda2.2@gmail.com	zhszmflxm123$		Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmGG1@gmail.com	zhszmflxm123$	생성자: 김강휘 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmGG1.1@gmail.com	zhszmflxm123$$		Y	Y	
마케팅사업부	생산성 AI	chat GPT	생산형 AI 툴		https://chat.openai.com/	ccfmDA1.1@gmail.com	zhszmflxm123$	생성자: 동재원 (생성자 2차 인증 필요)	Y	Y	
마케팅사업부	운영관리	쿠팡	사무용품 구매 		https://www.coupang.com/	admin@mkm20201101.com	ahajsxm12!@	쿠팡 와우 계정	Y	Y	
마케팅사업부	검색광고	아이템스카우트	검색광고팀 쇼핑검새광고 카테고리 추가 및 연관키워드 분석 		https://itemscout.io	mine5327@naver.com	fZ!D7VAuVJ#u#.		Y	Y	
마케팅사업부	비디오AI	AKOOL	딥페이크 소스 활용		https://akool.com/ko-kr	mkm1101m@gmail.com	dudtkdxla12	영상팀 계정 / 윤지민CD 2차 인증 필요	Y	Y	
마케팅사업부	비디오AI	구글 울트라	VEO3 활용			mkm.ai.20201101@gmail.com	ahajsxm12!@		Y	Y	
마케팅사업부	비디오AI	KLINGAI	생성형 ai 툴 도입을 위한 생산성 증진		https://app.klingai.com/	mkm1101m@gmail.com	dudtkdxla12	영상팀 계정 / 윤지민CD 2차 인증 필요	Y	Y	
마케팅사업부	비디오AI	TOPVIEW	AI 동영상 생성		https://www.topview.ai/ko	mkm1101m@gmail.com	dudtkdxla12	영상팀 계정 / 윤지민CD 2차 인증 필요	Y	Y	
마케팅사업부	운영관리	가비아	MKM 웹 호스팅 유지비용		https://www.gabia.com/	mkm506413@gmail.com	구글 계정으로 로그인		Y	Y	
마케팅사업부	생산성	버블	GFA 자동입찰 프로그램 서버비		https://bubble.io 	support@mkm20201101.com	ahajsxm12!@		Y	Y	
마케팅사업부	비디오AI	Higgsfield	ai 이미지, 영상 생성		https://higgsfield.ai/	mkm1101m@gmail.com	dudtkdxla12	영상팀 계정 / 윤지민CD 2차 인증 필요	Y	Y	
마케팅사업부	비디오AI	웨이브덱 	AI 음성/영상		https://wavedeck.ai/	mkm1101m@gmail.com	dudtkdxla12	영상팀 계정 / 윤지민CD 2차 인증 필요	Y	Y	
마케팅사업부	협업	loom	마케팅사업부 교육용 툴		https://www.loom.com/pricing	support@mkm20201101.com	ahajsxm12!@		Y	Y	
유통사업부	운영관리	Adobe	포토샵		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	pyr@samchomaeul.com			Y	Y	
유통사업부	운영관리	Adobe	포토샵		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	bec@samchomaeul.com			Y	Y	
유통사업부	운영관리	Adobe	프리미어		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	eggchungcho@gmail.com			Y	Y	
유통사업부	운영관리	Adobe	프리미어		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	ccfmshortform@samchomaeul.com			Y	Y	
유통사업부	운영관리	Adobe	프리미어		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	nkr@samchomaeul.com			Y	Y	
유통사업부	운영관리	Adobe	프리미어		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	cs@samchomaeul.com			Y	Y	
유통사업부	운영관리	Adobe	포토샵 - 간단 수정용		https://www.adobe.com/kr/?sdid=2NVQC8BX&mv=search&mv2=CC|Naver|BrandSearch&s_kwcid=AL!3085!87!6a95ae9d099d44adfd8b48b0b7f72068&ef_id=Xb98tgAAADZ5zHNU:20220210064955:s	support@samchomaeul.com			Y	Y	
유통사업부	협업	ChatGPT	숏폼, 디자인, 유통 사용		https://chatgpt.com/	support@samchomaeul.com			Y	Y	
유통사업부	생산성 AI	ChatGPT	경영관리실 전용		https://chatgpt.com/	tax@samchomaeul.com			Y	Y	
유통사업부	생산성 AI	데이터라이즈	수무수 쇼핑몰 DB 분석		https://datarize.ai/ko				Y	Y	
유통사업부	운영관리	리핏	사이트별 광고비 사용 내역 통합 조회						Y	Y	
유통사업부	비디오 AI	미드저니	AI 이미지 생성 툴		https://www.midjourney.com				Y	Y	
유통사업부	음성 AI	타입캐스트	음성 AI서비스		https://typecast.ai	ccfmshortform@samchomaeul.com			Y	Y	
유통사업부	텍스트	산돌구름	숏폼, 디자인 유료폰트 사용		https://cloud.sandoll.co.kr	design@samchomaeul.com			Y	Y	
유통사업부	디자인	피그마	웹 기반 UI/UX 디자인 협업 툴		https://www.figma.com	support@samchomaeul.com			Y	Y	
유통사업부	미디어 소스	경리나라	경리회계 프로그램		https://www.kyungrinara.co.kr				Y	Y	
유통사업부	운영관리	이지어드민	쇼핑몰 통합 관리		https://www.ezadmin.co.kr				Y	Y	
유통사업부	생산성 AI	Sora	숏폼, 디자인 / 영상, 이미지 생성 AI 		https://openai.com/sora				Y	Y	
유통사업부	생산성 AI	Kling	숏폼, 디자인 / 영상, 이미지 생성 AI 		https://klingai.com				Y	Y	
유통사업부	생산성 AI	Perplexity	실시간 웹 검색 기반 AI Q&A → 신뢰할 수 있는 출처 기반 답변 제공 (AI+검색의 하이브리드)		https://www.perplexity.ai				Y	Y	
유통사업부	생산성 AI	Claude	윤리성과 긴 문서 처리에 강한 AI 챗봇 → 회사 문서 요약·분석에 특화		https://claude.ai				Y	Y	
유통사업부	생산성 AI	Gemini	검색 + 문서 요약 + 코드 생성 등 다양한 작업 가능		https://gemini.google.com				Y	Y	"""

dept_map = {
    "콘크리트 파머스": "Department.CONCRETE",
    "브랜드사업부": "Department.BRAND",
    "마케팅사업부": "Department.MARKETING",
    "유통사업부": "Department.DISTRIBUTION"
}

def get_favicon(url):
    if not url: return "https://www.google.com/s2/favicons?domain=google.com&sz=128"
    try:
        domain = urlparse(url).netloc
        if not domain: return "https://www.google.com/s2/favicons?domain=google.com&sz=128"
        return f"https://www.google.com/s2/favicons?domain={domain}&sz=128"
    except:
        return "https://www.google.com/s2/favicons?domain=google.com&sz=128"

f = io.StringIO(data.strip())
reader = csv.reader(f, delimiter='\t')
header = next(reader)

tools = []
for i, row in enumerate(reader):
    if len(row) < 3: continue
    
    dept_name = row[0].strip()
    category = row[1].strip()
    tool_name = row[2].strip()
    description = row[3].strip() if len(row) > 3 else ""
    manual_link = row[4].strip() if len(row) > 4 else ""
    service_url = row[5].strip() if len(row) > 5 else ""
    login_id = row[6].strip() if len(row) > 6 else ""
    login_pw = row[7].strip() if len(row) > 7 else ""
    memo = row[8].strip() if len(row) > 8 else ""
    in_use = row[9].strip() if len(row) > 9 else "Y"
    is_paid = row[10].strip() if len(row) > 10 else "Y"
    
    dept_enum = dept_map.get(dept_name, "Department.CONCRETE")
    
    tool_id = f"tool_{i}"
    
    tool = {
        "id": tool_id,
        "department": dept_enum,
        "category": category,
        "tool_name": tool_name.replace("'", "\\'"),
        "description": description.replace("'", "\\'"),
        "logoUrl": get_favicon(service_url),
        "manual_link": manual_link,
        "service_url": service_url,
        "login_id": login_id.replace("'", "\\'").replace("\n", " "),
        "login_pw": login_pw.replace("'", "\\'").replace("\n", " "),
        "memo": memo.replace("'", "\\'").replace("\n", " "),
        "in_use": "Y" if "Y" in in_use.upper() else "N",
        "is_paid": "Y" if "Y" in is_paid.upper() else "N",
        "order": i
    }
    tools.append(tool)

ts_content = """
import { Department, Tool } from './types';

export const INITIAL_TOOLS: Tool[] = [
"""

for t in tools:
    ts_content += "  {\n"
    ts_content += f"    id: '{t['id']}',\n"
    ts_content += f"    department: {t['department']},\n"
    ts_content += f"    category: '{t['category']}',\n"
    ts_content += f"    tool_name: '{t['tool_name']}',\n"
    ts_content += f"    description: '{t['description']}',\n"
    ts_content += f"    logoUrl: '{t['logoUrl']}',\n"
    ts_content += f"    manual_link: '{t['manual_link']}',\n"
    ts_content += f"    service_url: '{t['service_url']}',\n"
    ts_content += f"    login_id: '{t['login_id']}',\n"
    ts_content += f"    login_pw: '{t['login_pw']}',\n"
    ts_content += f"    memo: '{t['memo']}',\n"
    ts_content += f"    in_use: '{t['in_use']}',\n"
    ts_content += f"    is_paid: '{t['is_paid']}',\n"
    ts_content += f"    order: {t['order']}\n"
    ts_content += "  },\n"

ts_content = ts_content.rstrip(",\n") + "\n];\n"

with open('constants.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
