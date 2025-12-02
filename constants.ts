
import { Department, Tool } from './types';

export const INITIAL_TOOLS: Tool[] = [
  // ==================================================================================
  // BRAND DEPARTMENT
  // ==================================================================================
  {
    id: 't_bankda',
    name: '뱅크다',
    description: '카페24 자동 입금 확인 서비스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=bankda.com&sz=128',
    linkUrl: 'http://www.bankda.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: '자동입금확인',
    category: '운영/관리',
    accounts: []
  },
  {
    id: 't_snap',
    name: '스냅컴퍼니',
    description: 'CRM 관련 광고 솔루션',
    logoUrl: 'https://www.google.com/s2/favicons?domain=snapcompany.net&sz=128',
    linkUrl: 'http://snapcompany.net/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'CRM',
    category: '데이터 분석',
    accounts: []
  },
  {
    id: 't_figma_brand',
    name: 'Figma (Brand)',
    description: '디자인 협업 및 UI/UX 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128',
    linkUrl: 'https://www.figma.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: '디자인',
    category: '디자인',
    accounts: []
  },
  {
    id: 't_chatgpt_brand',
    name: 'ChatGPT (Brand/Common)',
    description: '생산형 AI (카피라이팅/기획/공통)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    linkUrl: 'https://chat.openai.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Generative AI',
    category: '텍스트 AI',
    accounts: [
      {
        id: 'acc_gpt_b_1',
        accountId: 'ccfmDA1@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '동재원',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_2',
        accountId: 'ccfmDA2@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '민길상',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_3',
        accountId: 'ccfmDA3@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '전승탁',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '20일',
        connectedAccount: 'support@mkm20201101.com'
      },
      {
        id: 'acc_gpt_b_4',
        accountId: 'ccfmDA4@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '윤신혁',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_5',
        accountId: 'ccfmda2.2@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_6',
        accountId: 'ccfmGG1@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '김강휘',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0233-3663',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_7',
        accountId: 'ccfmGG1.1@gmail.com',
        accountPw: 'zhszmflxm123$$',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0233-3663',
        paymentDate: '20일',
        connectedAccount: ''
      },
      {
        id: 'acc_gpt_b_8',
        accountId: 'ccfmDA1.1@gmail.com',
        accountPw: 'zhszmflxm123$',
        twoFactorNote: '생성자 2차 인증 필요',
        creatorName: '동재원',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0233-3663',
        paymentDate: '20일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_runway',
    name: 'Runway',
    description: 'AI 영상 제작 및 편집',
    logoUrl: 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128',
    linkUrl: 'https://runwayml.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Video AI',
    category: '비디오 AI',
    accounts: [
      {
        id: 'acc_runway_1',
        accountId: '대표님 개인 계정',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '대표님',
        paymentType: 'Auto',
        cost: '확인불가',
        cardName: '비씨카드',
        cardNum: '5298-0307-5188-0938',
        paymentDate: '19일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_claude_brand',
    name: 'Claude.ai',
    description: '생산형 AI (기획/글쓰기)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128',
    linkUrl: 'https://claude.ai/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Generative AI',
    category: '텍스트 AI',
    accounts: [
       {
        id: 'acc_claude_1',
        accountId: '대표님 개인 계정',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '대표님',
        paymentType: 'Auto',
        cost: '$65.2',
        cardName: '비씨카드',
        cardNum: '5298-0307-5188-0938',
        paymentDate: '20일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_akool_brand',
    name: 'Akool AI',
    description: '딥페이크 및 영상 합성 소스 활용',
    logoUrl: 'https://www.google.com/s2/favicons?domain=akool.com&sz=128',
    linkUrl: 'https://akool.com/ko-kr',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Deepfake',
    category: '비디오 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_akool_1',
        accountId: 'mkm1101m@gmail.com',
        accountPw: 'dudtkdxla12',
        twoFactorNote: '윤지민CD 2차 인증 필요',
        creatorName: '윤지민',
        paymentType: 'Auto',
        cost: '$229',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '16일',
        connectedAccount: '영상팀 계정'
      }
    ]
  },
  {
    id: 't_topview_brand',
    name: 'Topview AI',
    description: 'AI 기반 비디오 편집 및 생성',
    logoUrl: 'https://www.google.com/s2/favicons?domain=topview.ai&sz=128',
    linkUrl: 'https://www.topview.ai/ko',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Video Edit',
    category: '비디오 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_topview_1',
        accountId: 'mkm1101m@gmail.com',
        accountPw: 'dudtkdxla12',
        twoFactorNote: '윤지민CD 2차 인증 필요',
        creatorName: '윤지민',
        paymentType: 'Auto',
        cost: '$150',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '26일',
        connectedAccount: '영상팀 계정'
      },
      {
        id: 'acc_topview_2',
        accountId: '대표님 개인 계정',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '대표님',
        paymentType: 'Auto',
        cost: '$90',
        cardName: '비씨카드',
        cardNum: '5298-0307-5188-0938',
        paymentDate: '7일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_celuv',
    name: '샐럽드랩',
    description: '알파리뷰 관리 솔루션',
    logoUrl: 'https://www.google.com/s2/favicons?domain=celuv.co.kr&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Review',
    category: '운영/관리',
    accounts: []
  },
  {
    id: 't_artlist',
    name: 'Artlist',
    description: '영상 음향효과 및 BGM',
    logoUrl: 'https://www.google.com/s2/favicons?domain=artlist.io&sz=128',
    linkUrl: 'https://artlist.io/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Sound/Video',
    category: '미디어 소스',
    accounts: [
      {
        id: 'acc_artlist_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '경영관리',
        paymentType: 'Yearly/Auto',
        cost: '$42.34',
        cardName: '하나카드',
        cardNum: '5376-1400-0266-4943',
        paymentDate: '10/15',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_shutterstock',
    name: 'Shutterstock',
    description: '스톡 이미지 및 비디오 소스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=shutterstock.com&sz=128',
    linkUrl: 'https://www.shutterstock.com/ko/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Stock Asset',
    category: '미디어 소스',
    accounts: [
      {
        id: 'acc_shutter_1',
        accountId: 'mkm506413@gmail.com',
        accountPw: 'mkmahajsxm12!@',
        twoFactorNote: '비밀번호 미공유',
        creatorName: 'MKM',
        paymentType: 'Yearly/Auto',
        cost: '$199',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '10/19',
        connectedAccount: 'mkm506413@gmail.com'
      }
    ]
  },
  {
    id: 't_typecast_brand',
    name: 'Typecast (Brand)',
    description: 'AI 보이스/성우 서비스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=typecast.ai&sz=128',
    linkUrl: 'https://typecast.ai/kr',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'TTS',
    category: '보이스 AI',
    accounts: [
      {
        id: 'acc_typecast_brand_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Monthly/Auto',
        cost: '99,000원',
        cardName: '비씨카드',
        cardNum: '5298-0327-2488-1985',
        paymentDate: '10일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_elevenlabs',
    name: 'ElevenLabs',
    description: '고품질 AI 음성 합성',
    logoUrl: 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128',
    linkUrl: 'https://elevenlabs.io/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'TTS',
    category: '보이스 AI',
    isManaged: true,
    accounts: [
       {
        id: 'acc_eleven_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Admin',
        paymentType: 'Monthly',
        cost: '$11',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '25일',
        connectedAccount: 'admin@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_make',
    name: 'MAKE',
    description: '업무 자동화 (No-code Automation)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=make.com&sz=128',
    linkUrl: 'https://www.make.com/en/ai-automation',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Automation',
    category: '운영/관리',
    accounts: [
       {
        id: 'acc_make_1',
        accountId: 'ai@ccfm.co.kr',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'AI팀',
        paymentType: 'Yearly',
        cost: '$192',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '2/28',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_mangoboard',
    name: '망고보드 (Brand)',
    description: '웹 기반 디자인 제작 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mangoboard.net&sz=128',
    linkUrl: 'https://www.mangoboard.net/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Design',
    category: '디자인',
    accounts: [
       {
        id: 'acc_mango_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '48,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '26일',
        connectedAccount: 'support@mkm20201101.com'
      },
       {
        id: 'acc_mango_2',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '인사팀 사용',
        creatorName: '인사팀',
        paymentType: 'Yearly',
        cost: '560,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0233-3663',
        paymentDate: '8/1',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_clipart',
    name: '클립아트코리아',
    description: '이미지 소스 및 라이선스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=clipartkorea.co.kr&sz=128',
    linkUrl: 'https://www.clipartkorea.co.kr/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Stock Asset',
    category: '미디어 소스',
    accounts: [
       {
        id: 'acc_clipart_1',
        accountId: 'mkm202011',
        accountPw: 'mkmahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Yearly',
        cost: '1,650,000원',
        cardName: '비씨카드',
        cardNum: '5298-0307-7811-0962',
        paymentDate: '10/26',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_utoimage',
    name: '유토이미지',
    description: '유료 이미지 소스 다운로드',
    logoUrl: 'https://www.google.com/s2/favicons?domain=utoimage.com&sz=128',
    linkUrl: 'https://www.utoimage.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Stock Asset',
    category: '미디어 소스',
    accounts: [
       {
        id: 'acc_uto_1',
        accountId: 'mkm20201101',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Yearly',
        cost: '1,283,700원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '7/11',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_rixfont',
    name: '릭스폰트',
    description: '디자인용 폰트 클라우드 서비스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=rixfontcloud.com&sz=128',
    linkUrl: 'https://www.rixfontcloud.com/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Font',
    category: '미디어 소스',
    accounts: [
       {
        id: 'acc_rix_1',
        accountId: 'mkm506413@gmail.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'MKM',
        paymentType: 'Yearly',
        cost: '855,300원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '9/8',
        connectedAccount: 'mkm506413@gmail.com'
      }
    ]
  },
  {
    id: 't_midjourney_brand',
    name: 'Midjourney (Brand)',
    description: '고품질 AI 이미지 생성',
    logoUrl: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128',
    linkUrl: 'https://www.midjourney.com/home',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Image Gen',
    category: '이미지 AI',
    isManaged: true,
    accounts: [
       {
        id: 'acc_mj_brand_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '$96',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '9일',
        connectedAccount: 'support@mkm20201101.com'
      },
      {
        id: 'acc_mj_brand_2',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Admin',
        paymentType: 'Yearly/Auto',
        cost: '$1267',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '27일',
        connectedAccount: 'admin@mkm20201101.com'
      },
      {
        id: 'acc_mj_brand_3',
        accountId: '계정 윤지민CD님 확인 필요',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Yearly/Auto',
        cost: '$1267',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '8일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_higgsfield',
    name: 'Higgsfield',
    description: '비디오/이미지 생성 AI',
    logoUrl: 'https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128',
    linkUrl: 'https://higgsfield.ai/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Video Gen',
    category: '비디오 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_higgs_1',
        accountId: 'mkm1101m@gmail.com',
        accountPw: 'dudtkdxla12',
        twoFactorNote: '윤지민CD 2차 인증 필요',
        creatorName: '윤지민',
        paymentType: 'Auto',
        cost: '$79',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '7일',
        connectedAccount: '영상팀 계정'
      }
    ]
  },
  {
    id: 't_ideogram',
    name: 'Ideogram',
    description: '텍스트 렌더링 특화 이미지 AI',
    logoUrl: 'https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128',
    linkUrl: 'https://ideogram.ai/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Image Gen',
    category: '이미지 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_ideogram_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Auto',
        cost: '$20',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '9일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_wavedeck',
    name: 'Wavedeck',
    description: 'AI 오디오/비디오 편집',
    logoUrl: 'https://www.google.com/s2/favicons?domain=wavedeck.ai&sz=128',
    linkUrl: 'https://wavedeck.ai/',
    manualUrl: '',
    department: Department.BRAND,
    purpose: 'Editor',
    category: '비디오 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_wave_1',
        accountId: 'mkm1101m@gmail.com',
        accountPw: 'dudtkdxla12',
        twoFactorNote: '윤지민CD 2차 인증 필요',
        creatorName: '윤지민',
        paymentType: '',
        cost: '99,900',
        cardName: '하나카드',
        cardNum: '5376-1400-0234-6475',
        paymentDate: '확인 필요',
        connectedAccount: '영상팀 계정'
      }
    ]
  },

  // ==================================================================================
  // MARKETING DEPARTMENT
  // ==================================================================================
  {
    id: 't_cafe24',
    name: '카페24',
    description: '쇼핑몰 호스팅 및 어드민',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cafe24.com&sz=128',
    linkUrl: 'https://www.cafe24.com/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Hosting',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_cafe24_1',
        accountId: 'ccfmacademy',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '전자책',
        paymentType: 'Yearly',
        cost: '48,770원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '10/24',
        connectedAccount: '대표님 카드 지출'
      }
    ]
  },
  {
    id: 't_tali',
    name: '탈리 (Tali)',
    description: '고객사 DB 수집 폼 빌더',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tali.ai&sz=128',
    linkUrl: 'https://tali.ai/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Data Collection',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_tali_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '$29',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '30일',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_imweb',
    name: '아임웹',
    description: '웹사이트 빌더 및 랜딩페이지',
    logoUrl: 'https://www.google.com/s2/favicons?domain=imweb.me&sz=128',
    linkUrl: 'https://imweb.me/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Web Builder',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_imweb_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'Ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Admin',
        paymentType: 'Monthly/Auto',
        cost: '22,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '7일',
        connectedAccount: 'admin@mkm20201101.com'
      },
      {
        id: 'acc_imweb_2',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'Ahajsxm12!@',
        twoFactorNote: 'AI 버전 페이지',
        creatorName: 'Admin',
        paymentType: 'Monthly/Auto',
        cost: '22,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '18일',
        connectedAccount: 'admin@mkm20201101.com'
      },
      {
        id: 'acc_imweb_3',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '숏폼사업부 사용',
        creatorName: '',
        paymentType: 'Monthly/Auto',
        cost: '22,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '18일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_blackkiwi',
    name: '블랙키위',
    description: '키워드 검색량 조회 및 분석',
    logoUrl: 'https://www.google.com/s2/favicons?domain=blackkiwi.net&sz=128',
    linkUrl: 'https://blackkiwi.net/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_bk_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '98,010',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '14일',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_sometrend',
    name: '썸트렌드',
    description: '소셜 빅데이터 및 트렌드 분석',
    logoUrl: 'https://www.google.com/s2/favicons?domain=some.co.kr&sz=128',
    linkUrl: 'https://some.co.kr/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Trend',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_st_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '99,000원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '4일',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_cigro',
    name: '씨그로 (CIGRO)',
    description: '광고 데이터 통합 대시보드',
    logoUrl: 'https://www.google.com/s2/favicons?domain=cigro.io&sz=128',
    linkUrl: 'https://www.cigro.io/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Ad Data',
    category: '데이터 분석',
    accounts: [
       {
        id: 'acc_cigro_1',
        accountId: 'mkm506413@gmail.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'MKM',
        paymentType: 'Monthly/Auto',
        cost: '변동',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '5일',
        connectedAccount: 'mkm506413@gmail.com'
      }
    ]
  },
  {
    id: 't_publy',
    name: '퍼블리 (Publy)',
    description: '실무 스킬 및 인사이트 콘텐츠',
    logoUrl: 'https://www.google.com/s2/favicons?domain=publy.co&sz=128',
    linkUrl: 'https://publy.co/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Education',
    category: '교육/인사이트',
    accounts: [
      {
        id: 'acc_publy_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Admin',
        paymentType: 'Yearly/Auto',
        cost: '117,700원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '10/19',
        connectedAccount: 'admin@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_itemscout',
    name: '아이템스카우트',
    description: '이커머스 키워드 및 상품 분석',
    logoUrl: 'https://www.google.com/s2/favicons?domain=itemscout.io&sz=128',
    linkUrl: 'https://itemscout.io/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'E-commerce',
    category: '데이터 분석',
    accounts: [
       {
        id: 'acc_item_1',
        accountId: 'mine5327@naver.com',
        accountPw: 'fZ!D7VAuVJ#u#.',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Monthly/Auto',
        cost: '25,850원',
        cardName: '하나카드',
        cardNum: '5376-1400-0271-3344',
        paymentDate: '28일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_smartlog',
    name: '스마트로그',
    description: '검색광고 자동입찰 프로그램',
    logoUrl: '',
    linkUrl: '',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Ad Bid',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_smartlog_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '자동입찰 프로그램',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '정산 지급',
        cardName: '계좌이체',
        cardNum: '',
        paymentDate: '5일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_loom',
    name: 'Loom',
    description: '화면 녹화 및 비디오 메시징',
    logoUrl: 'https://www.google.com/s2/favicons?domain=loom.com&sz=128',
    linkUrl: 'https://www.loom.com/pricing',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Communication',
    category: '생산성/협업',
    accounts: [
       {
        id: 'acc_loom_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '$24',
        cardName: '하나카드',
        cardNum: '5376-1400-0266-4943',
        paymentDate: '20일',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_oopy',
    name: 'Oopy (우피)',
    description: '노션 기반 웹사이트 빌더',
    logoUrl: 'https://www.google.com/s2/favicons?domain=oopy.io&sz=128',
    linkUrl: 'https://app.oopy.io/home',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Web Builder',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_oopy_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'Ahajsxm12!@',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly/Auto',
        cost: '11,033원',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '25일',
        connectedAccount: 'support@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_gabia',
    name: '가비아',
    description: '도메인 및 호스팅 관리',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gabia.com&sz=128',
    linkUrl: 'https://www.gabia.com/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Infra',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_gabia_1',
        accountId: 'mkm506413@gmail.com',
        accountPw: 'Google Login',
        twoFactorNote: '',
        creatorName: 'MKM',
        paymentType: 'Yearly',
        cost: '238,260',
        cardName: '비씨카드',
        cardNum: '5298-0307-7811-0962',
        paymentDate: '7/21',
        connectedAccount: 'mkm506413@gmail.com'
      }
    ]
  },
  {
    id: 't_flex',
    name: 'Flex',
    description: 'HR 인사 관리 시스템',
    logoUrl: 'https://www.google.com/s2/favicons?domain=flex.team&sz=128',
    linkUrl: 'https://flex.team/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'HR',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_flex_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '직원 별 권한 부여형 계정',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '하나카드',
        cardNum: '5376-1400-0297-4029',
        paymentDate: '',
        connectedAccount: ''
      },
       {
        id: 'acc_flex_2',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '공통 HR',
        creatorName: '',
        paymentType: 'Yearly/Auto',
        cost: '180,000',
        cardName: '4265-8692-2177-9838',
        cardNum: '',
        paymentDate: '20일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_slack',
    name: 'Slack',
    description: '사내 업무용 메신저',
    logoUrl: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128',
    linkUrl: 'https://slack.com/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Communication',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_slack_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '직원 별 권한 부여형 계정',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '계좌이체',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_slack_2',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '공용',
        creatorName: '',
        paymentType: 'Yearly/Auto',
        cost: '$1,479',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '3월 23일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_notion',
    name: 'Notion',
    description: '올인원 워크스페이스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    linkUrl: 'https://www.notion.so/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Docs',
    category: '생산성/협업',
    accounts: [
       {
        id: 'acc_notion_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '직원 별 권한 부여형 계정 (Notion Labs)',
        creatorName: '',
        paymentType: 'Yearly',
        cost: '인 당 $15',
        cardName: '계좌이체',
        cardNum: '',
        paymentDate: '5/15',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_coupang',
    name: '쿠팡 (Coupang)',
    description: '사무용품 구매 (와우)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=coupang.com&sz=128',
    linkUrl: 'https://www.coupang.com/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Purchase',
    category: '운영/관리',
    accounts: [
       {
        id: 'acc_coupang_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '와우 계정',
        creatorName: 'Admin',
        paymentType: 'Monthly/Auto',
        cost: '4,990원',
        cardName: '비씨카드',
        cardNum: '5298-0327-2488-1985',
        paymentDate: '21일',
        connectedAccount: 'admin@mkm20201101.com'
      }
    ]
  },
  {
    id: 't_google_biz',
    name: 'Google Business',
    description: 'G-Suite 및 비즈니스 계정 관리',
    logoUrl: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
    linkUrl: 'https://admin.google.com/',
    manualUrl: '',
    department: Department.MARKETING,
    purpose: 'Admin',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_google_biz_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '직원 별 권한 부여형 계정',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '변동',
        cardName: '계좌이체',
        cardNum: '',
        paymentDate: '1일',
        connectedAccount: ''
      },
      {
        id: 'acc_google_biz_2',
        accountId: '대표님 개인 계정',
        accountPw: '-',
        twoFactorNote: '구글 울트라',
        creatorName: '대표님',
        paymentType: 'Monthly/Auto',
        cost: '180,000원',
        cardName: '비씨카드',
        cardNum: '5298-0307-5188-0938',
        paymentDate: '27일',
        connectedAccount: ''
      },
       {
        id: 'acc_google_biz_3',
        accountId: 'mkm.ai.20201101@gmail.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '구글 울트라 (영상)',
        creatorName: '',
        paymentType: 'Monthly/Auto',
        cost: '180,000원',
        cardName: '비씨카드',
        cardNum: '5298-0307-5188-0938',
        paymentDate: '28일',
        connectedAccount: ''
      }
    ]
  },

  // ==================================================================================
  // CONCRETE FARMERS
  // ==================================================================================
  {
    id: 't_imweb_cf',
    name: '아임웹 (Concrete)',
    description: '웹사이트 빌더 (숏폼/상세페이지/쿠팡/마케팅)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=imweb.me&sz=128',
    linkUrl: 'https://imweb.me',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Web Builder',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_imweb_cf_1',
        accountId: 'support@samchomaeul.com',
        accountPw: 'Tkach323#@#',
        twoFactorNote: '숏폼,상세페이지,쿠팡 (첫 문자 대문자 주의)',
        creatorName: '구글 연동',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_imweb_cf_2',
        accountId: 'support@mkm20201101.com',
        accountPw: 'Moment1!',
        twoFactorNote: '마케팅사업부',
        creatorName: '구글 연동',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_wordpress_cf',
    name: 'ccfm (워드프레스)',
    description: '워드프레스 관리자',
    logoUrl: 'https://www.google.com/s2/favicons?domain=wordpress.com&sz=128',
    linkUrl: 'https://ccfm.co.kr/wp-admin/admin.php?page=chromeapp-helper-banner',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'CMS',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_wp_cf_1',
        accountId: 'chungchoegg',
        accountPw: 'tkach1212!',
        twoFactorNote: 'API: wRTc jGnQ 7SII V5h6 2sDA 76S4',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_beusable_cf',
    name: '뷰저블 (자사)',
    description: 'UX 데이터 분석 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=beusable.net&sz=128',
    linkUrl: 'https://www.beusable.net',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_beusable_cf_1',
        accountId: 'ccfmedu@ccfm.co.kr',
        accountPw: 'Moment1!',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_tally_cf',
    name: '탈리 (Tally)',
    description: '폼 빌더 및 데이터 수집',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tally.so&sz=128',
    linkUrl: 'https://tally.so',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Form',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_tally_cf_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_capcut_cf',
    name: '캡컷 (Capcut)',
    description: '영상 편집 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128',
    linkUrl: 'https://www.capcut.com',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Video Edit',
    category: '비디오 AI',
    accounts: [
      {
        id: 'acc_capcut_cf_1',
        accountId: 'ccfmbrandmkt@gmail.com',
        accountPw: 'qmaktlf12!@',
        twoFactorNote: '구글 연동',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_solapi_cf',
    name: '솔라피 (Solapi)',
    description: '메시지 발송 솔루션',
    logoUrl: 'https://www.google.com/s2/favicons?domain=solapi.com&sz=128',
    linkUrl: 'https://solapi.com',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Messaging',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_solapi_cf_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '2단계 인증비번: 123456',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_zoom_cf',
    name: '줌 (Zoom)',
    description: '화상 회의 솔루션',
    logoUrl: 'https://www.google.com/s2/favicons?domain=zoom.us&sz=128',
    linkUrl: 'https://zoom.us',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Meeting',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_zoom_cf_1',
        accountId: 'ccfmedu@ccfm.co.kr',
        accountPw: 'Ahajsxm12!@',
        twoFactorNote: '소셜로그인도 가능',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_claude_cf',
    name: '클로드 Max 플랜',
    description: '고성능 AI 챗봇',
    logoUrl: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128',
    linkUrl: 'https://claude.ai',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Text AI',
    category: '텍스트 AI',
    accounts: [
      {
        id: 'acc_claude_cf_1',
        accountId: 'ccfmbrandmkt@gmail.com',
        accountPw: 'tkach212@!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_make_cf',
    name: 'Make (노코드 툴)',
    description: '업무 자동화 플랫폼',
    logoUrl: 'https://www.google.com/s2/favicons?domain=make.com&sz=128',
    linkUrl: 'https://www.make.com',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Automation',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_make_cf_1',
        accountId: 'ai@ccfm.co.kr',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_outcode_cf',
    name: '아웃코드',
    description: '데이터 자동화 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=outcode.biz&sz=128',
    linkUrl: 'https://outcode.biz',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Data Automation',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_outcode_cf_1',
        accountId: 'ccfmbrandmkt@gmail.com',
        accountPw: 'qmaktlf12!@',
        twoFactorNote: '지메일연동',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_blackkiwi_cf',
    name: '블랙키위',
    description: '키워드 분석 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=blackkiwi.net&sz=128',
    linkUrl: 'https://blackkiwi.net',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_bk_cf_1',
        accountId: 'support@mkm20201101.com',
        accountPw: '모먼트12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_mangoboard_cf',
    name: '망고보드',
    description: '디자인 제작 플랫폼',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mangoboard.net&sz=128',
    linkUrl: 'https://www.mangoboard.net',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Design',
    category: '디자인',
    accounts: [
      {
        id: 'acc_mango_cf_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_modusign_cf',
    name: '모두싸인',
    description: '전자 계약 서비스',
    logoUrl: 'https://www.google.com/s2/favicons?domain=modusign.co.kr&sz=128',
    linkUrl: 'https://modusign.co.kr',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Contract',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_modusign_cf_1',
        accountId: 'admin@ccfm.co.kr',
        accountPw: 'ahenTkdls12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_sometrend_cf',
    name: '썸트렌드',
    description: '빅데이터 트렌드 분석',
    logoUrl: 'https://www.google.com/s2/favicons?domain=some.co.kr&sz=128',
    linkUrl: 'https://some.co.kr',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_sometrend_cf_1',
        accountId: 'support@mkm201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '소셜로그인 구글',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_publy_cf',
    name: '퍼블리 계정',
    description: '직무 교육 및 콘텐츠',
    logoUrl: 'https://www.google.com/s2/favicons?domain=publy.co&sz=128',
    linkUrl: 'https://publy.co',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Education',
    category: '교육/인사이트',
    accounts: [
      {
        id: 'acc_publy_cf_1',
        accountId: 'admin@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_gabia_cf',
    name: '가비아',
    description: '도메인 관리 (ccfmedu)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=gabia.com&sz=128',
    linkUrl: 'https://www.gabia.com',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Domain',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_gabia_cf_1',
        accountId: 'ccfmedu@ccfm.co.kr',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_artlist_cf',
    name: 'Artlist',
    description: '영상 소스 및 음원',
    logoUrl: 'https://www.google.com/s2/favicons?domain=artlist.io&sz=128',
    linkUrl: 'https://artlist.io',
    manualUrl: '',
    department: Department.CONCRETE,
    purpose: 'Media Asset',
    category: '미디어 소스',
    accounts: [
      {
        id: 'acc_artlist_cf_1',
        accountId: 'support@mkm20201101.com',
        accountPw: 'ahajsxm12!@',
        twoFactorNote: '',
        creatorName: '',
        paymentType: '',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },

  // ==================================================================================
  // DISTRIBUTION DEPARTMENT (유통/디자인/숏폼 공용 포함)
  // ==================================================================================
  {
    id: 't_adobe',
    name: 'Adobe Creative Cloud',
    description: 'Photoshop, Premiere Pro 등 디자인/영상 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=adobe.com&sz=128',
    linkUrl: 'https://www.adobe.com/kr/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Design/Video',
    category: '디자인',
    accounts: [
       {
        id: 'acc_adobe_1',
        accountId: 'pyr@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '디자인사업팀 (포토샵)',
        creatorName: 'PYR',
        paymentType: 'Yearly/Monthly',
        cost: '800,800',
        cardName: '4265-8692-2177-9895',
        cardNum: '',
        paymentDate: '16일',
        connectedAccount: ''
      },
      {
        id: 'acc_adobe_2',
        accountId: 'bec@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '디자인사업팀 (포토샵)',
        creatorName: 'BEC',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_adobe_3',
        accountId: 'eggchungcho@gmail.com',
        accountPw: '-',
        twoFactorNote: '숏폼사업팀 (프리미어)',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_adobe_4',
        accountId: 'ccfmshortform@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '숏폼사업팀 (프리미어)',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_adobe_5',
        accountId: 'nkr@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '숏폼사업팀 (프리미어)',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
      {
        id: 'acc_adobe_6',
        accountId: 'cs@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '숏폼사업팀 (프리미어)',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      },
       {
        id: 'acc_adobe_7',
        accountId: 'support@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '유통본부 (간단 수정용)',
        creatorName: 'Support',
        paymentType: 'Yearly/Monthly',
        cost: '',
        cardName: '',
        cardNum: '',
        paymentDate: '',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_chatgpt_dist',
    name: 'ChatGPT (Distribution)',
    description: '생산형 AI (디자인, 숏폼, 유통)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    linkUrl: 'https://chatgpt.com/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Generative AI',
    category: '텍스트 AI',
    accounts: [
       {
        id: 'acc_chatgpt_dist_1',
        accountId: 'support@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '공통 (숏폼, 디자인, 유통)',
        creatorName: 'Support',
        paymentType: 'Monthly',
        cost: '$20',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '11일',
        connectedAccount: ''
      },
      {
        id: 'acc_chatgpt_dist_2',
        accountId: 'tax@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '경영관리실 전용',
        creatorName: 'Tax',
        paymentType: 'Monthly',
        cost: '$20',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '13일',
        connectedAccount: ''
      },
       {
        id: 'acc_chatgpt_dist_3',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '성대표님 전용',
        creatorName: '대표님',
        paymentType: 'Monthly',
        cost: '$20',
        cardName: '5105-5400-0066-7533',
        cardNum: '',
        paymentDate: '15일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_google_workspace_dist',
    name: 'Google Workspace',
    description: '구글 비즈니스 계정 (공용)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=workspace.google.com&sz=128',
    linkUrl: 'https://workspace.google.com/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Ops',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_gws_dist_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '구글 비즈니스 계정',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '$421',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '1일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_notion_dist',
    name: 'Notion (Dist)',
    description: '유통콘텐츠사업부 노션',
    logoUrl: 'https://www.google.com/s2/favicons?domain=notion.so&sz=128',
    linkUrl: 'https://www.notion.so/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Docs',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_notion_dist_1',
        accountId: 'support@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Monthly',
        cost: '$12',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '13일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_datarize',
    name: '데이터라이즈',
    description: '수무수 쇼핑몰 DB 분석',
    logoUrl: 'https://www.google.com/s2/favicons?domain=datarize.ai&sz=128',
    linkUrl: 'https://datarize.ai/ko',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_datarize_1',
        accountId: 'ksh@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: 'KSH',
        paymentType: 'Monthly',
        cost: '110,000',
        cardName: '4265-8692-2177-9838',
        cardNum: '',
        paymentDate: '26일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_refit',
    name: '리핏',
    description: '광고비 통합 조회',
    logoUrl: '',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Analytics',
    category: '데이터 분석',
    accounts: [
      {
        id: 'acc_refit_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '사이트별 광고비 내역 통합',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '319,000',
        cardName: '4265-8692-2177-9838',
        cardNum: '',
        paymentDate: '1일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_midjourney_dist',
    name: 'Midjourney (Dist)',
    description: '디자인사업팀 AI 이미지',
    logoUrl: 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128',
    linkUrl: 'https://www.midjourney.com/home',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Image Gen',
    category: '이미지 AI',
    isManaged: true,
    accounts: [
      {
        id: 'acc_mj_dist_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '디자인사업팀',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '$30',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '16일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_typecast_dist',
    name: 'Typecast (Dist)',
    description: '숏폼사업팀 음성 AI',
    logoUrl: 'https://www.google.com/s2/favicons?domain=typecast.ai&sz=128',
    linkUrl: 'https://app.typecast.ai/ko/dashboard',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'TTS',
    category: '보이스 AI',
    accounts: [
      {
        id: 'acc_tc_dist_1',
        accountId: 'ccfmshortform@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '99,000',
        cardName: '4265-8692-2177-9846',
        cardNum: '',
        paymentDate: '26일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_sandoll',
    name: '산돌구름',
    description: '유료 폰트 클라우드',
    logoUrl: 'https://www.google.com/s2/favicons?domain=sandollcloud.com&sz=128',
    linkUrl: 'https://www.sandollcloud.com/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Font',
    category: '미디어 소스',
    accounts: [
      {
        id: 'acc_sandoll_1',
        accountId: 'design@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '숏폼/디자인',
        creatorName: 'Design',
        paymentType: 'Monthly',
        cost: '88,000',
        cardName: '9409-2000-2122-8337',
        cardNum: '',
        paymentDate: '25일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_figma_dist',
    name: 'Figma (Dist)',
    description: 'UI/UX 디자인 협업 툴',
    logoUrl: 'https://www.google.com/s2/favicons?domain=figma.com&sz=128',
    linkUrl: 'https://www.figma.com/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Design',
    category: '디자인',
    accounts: [
      {
        id: 'acc_figma_dist_1',
        accountId: 'support@samchomaeul.com',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: 'Support',
        paymentType: 'Yearly',
        cost: '$432',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '1월 22일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_slack_dist',
    name: 'Slack (Dist)',
    description: '내부 소통용 메신저',
    logoUrl: 'https://www.google.com/s2/favicons?domain=slack.com&sz=128',
    linkUrl: 'https://slack.com',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Communication',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_slack_dist_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '$1,479',
        cardName: '5566-0800-2148-7209',
        cardNum: '',
        paymentDate: '3월 23일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_flex_dist',
    name: 'Flex (Dist)',
    description: 'HR 플랫폼',
    logoUrl: 'https://www.google.com/s2/favicons?domain=flex.team&sz=128',
    linkUrl: 'https://flex.team/',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'HR',
    category: '생산성/협업',
    accounts: [
      {
        id: 'acc_flex_dist_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Yearly/Monthly',
        cost: '180,000',
        cardName: '4265-8692-2177-9838',
        cardNum: '',
        paymentDate: '20일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_serp',
    name: '경리나라',
    description: '경리 회계 프로그램',
    logoUrl: '',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Finance',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_serp_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '77,000',
        cardName: '경리계좌 자동이체',
        cardNum: '',
        paymentDate: '10일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_easyadmin',
    name: '이지어드민',
    description: '쇼핑몰 통합 관리',
    logoUrl: '',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Admin',
    category: '운영/관리',
    accounts: [
      {
        id: 'acc_easy_1',
        accountId: '-',
        accountPw: '-',
        twoFactorNote: '',
        creatorName: '',
        paymentType: 'Monthly',
        cost: '330,000',
        cardName: '주거래계좌 자동이체',
        cardNum: '',
        paymentDate: '말일',
        connectedAccount: ''
      }
    ]
  },
  {
    id: 't_sora',
    name: 'Sora',
    description: 'Video Gen AI (Free)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Video Gen',
    category: '비디오 AI',
    accounts: []
  },
  {
    id: 't_kling_dist',
    name: 'Kling (Dist)',
    description: 'Video Gen AI (Free)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=klingai.com&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Video Gen',
    category: '비디오 AI',
    accounts: []
  },
  {
    id: 't_perplexity_dist',
    name: 'Perplexity (Dist)',
    description: 'Search AI (Free)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Search AI',
    category: '텍스트 AI',
    accounts: []
  },
  {
    id: 't_claude_dist',
    name: 'Claude (Dist)',
    description: 'Text AI (Free)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Text AI',
    category: '텍스트 AI',
    accounts: []
  },
  {
    id: 't_gemini_dist',
    name: 'Gemini (Dist)',
    description: 'Google AI (Free)',
    logoUrl: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
    linkUrl: '',
    manualUrl: '',
    department: Department.DISTRIBUTION,
    purpose: 'Text AI',
    category: '텍스트 AI',
    accounts: []
  }
];
