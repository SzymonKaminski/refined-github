import React from 'dom-chef';
import select from 'select-dom';
import * as pageDetect from 'github-url-detection';

import features from '../feature-manager';
import {getCleanPathname} from '../github-helpers';

function init(): void {
	let commitUrl = '/' + getCleanPathname();

	// Avoids a redirection
	if (pageDetect.isPRCommit()) {
		commitUrl = commitUrl.replace(/\/pull\/\d+\/commits/, '/commit');
	}

	const commitMeta = select('.commit-meta')!;
	commitMeta.classList.remove('no-wrap'); // #5987
	commitMeta.lastElementChild!.append(
		<span className="sha-block" data-turbo="false">
			<a href={`${commitUrl}.patch`} className="sha">patch</a>
			{' '}
			<a href={`${commitUrl}.diff`} className="sha">diff</a>
		</span>,
	);
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isCommit,
	],
	exclude: [
		pageDetect.isPRCommit404,
	],
	deduplicate: 'has-rgh-inner',
	init,
});
